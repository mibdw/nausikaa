// Builds the stylesheet: styles/nausikaa.css becomes dist/nausikaa.min.css.
//
// PostCSS inlines the @imports and unwraps nesting the way Sass did (without
// :is(), which the oldest supported browsers lack). Lightning CSS then
// resolves static color functions for the browsers in package.json's
// browserslist and minifies the result.
//
// Usage: node tools/build-css.js [--watch]
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import browserslist from "browserslist";
import { transform, browserslistToTargets, Features } from "lightningcss";

const root = path.resolve(import.meta.dirname, "..");
const targets = browserslistToTargets(browserslist(undefined, { path: root }));
// The high contrast themes apply in two ways: on their own when the system
// asks for more contrast and the page hasn't chosen a theme, and when the
// page chooses one with data-theme. A block written as
// @nausikaa-contrast light|dark { ... } is written out for both ways; one
// without light or dark applies to both themes.
const contrastSelectors = {
  light: { media: "(prefers-contrast: more)", chosen: ':root[data-theme="contrast-light"]' },
  dark: {
    media: "(prefers-contrast: more) and (prefers-color-scheme: dark)",
    chosen: ':root[data-theme="contrast-dark"]',
  },
  "": {
    media: "(prefers-contrast: more)",
    chosen: ':root[data-theme="contrast-light"],\n:root[data-theme="contrast-dark"]',
  },
};

const contrastThemes = () => ({
  postcssPlugin: "nausikaa-contrast",
  AtRule: {
    "nausikaa-contrast": (atRule) => {
      const scheme = contrastSelectors[atRule.params.trim()];
      if (!scheme) throw atRule.error("@nausikaa-contrast takes light, dark or nothing");
      const copy = (selector) => postcss.rule({ selector, nodes: atRule.nodes.map((n) => n.clone()) });
      const automatic = postcss.atRule({ name: "media", params: scheme.media });
      automatic.append(copy(":root:not([data-theme])"));
      atRule.replaceWith(automatic, copy(scheme.chosen));
    },
  },
});

const processor = postcss([
  postcssImport(),
  contrastThemes(),
  postcssNesting({ edition: "2021", noIsPseudoSelector: true }),
]);

// Selectors the oldest supported browsers don't understand. Lightning CSS
// may introduce these when it rewrites selectors, so the build refuses them.
const unsupported = [":is(", ":where(", "-webkit-any(", "-moz-any("];

// The dark theme values are listed twice in tokens-dark.css (for the system
// preference and for data-theme="dark"); make sure the two lists agree.
const checkDarkTokens = () => {
  const file = path.join(root, "styles", "tokens-dark.css");
  const lists = [];
  postcss.parse(fs.readFileSync(file, "utf8")).walkRules((rule) => {
    const decls = {};
    rule.walkDecls((d) => (decls[d.prop] = d.value));
    lists.push(decls);
  });
  const [a, b] = lists.map((l) => JSON.stringify(Object.entries(l).sort()));
  if (lists.length !== 2 || a !== b) {
    throw new Error("styles/tokens-dark.css: the two lists of dark values must be identical");
  }
};

// The high contrast lists come after the dark one and must replace all of
// it, also when the system prefers dark and the light version is chosen.
const checkContrastTokens = () => {
  const values = (file, selector) => {
    const decls = {};
    postcss.parse(fs.readFileSync(path.join(root, "styles", file), "utf8")).walk((node) => {
      if ((node.type === "rule" && node.selector === selector) || (node.type === "atrule" && node.params === selector)) {
        node.walkDecls((d) => (decls[d.prop] = d.value));
      }
    });
    return Object.keys(decls);
  };
  const dark = values("tokens-dark.css", ':root[data-theme="dark"]');
  for (const scheme of ["light", "dark"]) {
    const missing = dark.filter((prop) => !values("tokens-contrast.css", scheme).includes(prop));
    if (missing.length) throw new Error(`styles/tokens-contrast.css (${scheme}) doesn't set ${missing.join(", ")}`);
  }
};

const build = async () => {
  checkDarkTokens();
  checkContrastTokens();
  const from = path.join(root, "styles", "nausikaa.css");
  const to = path.join(root, "dist", "nausikaa.min.css");
  const flat = await processor.process(fs.readFileSync(from, "utf8"), { from });
  const { code, warnings } = transform({
    filename: from,
    code: Buffer.from(flat.css),
    minify: true,
    targets,
    // We don't use light-dark(); without this Lightning CSS adds helper
    // variables next to every color-scheme declaration.
    exclude: Features.LightDark,
  });
  for (const w of [...flat.warnings(), ...warnings]) console.warn(w.text ?? w.message);
  const css = code.toString();
  const found = unsupported.filter((s) => css.includes(s));
  if (found.length) throw new Error(`output contains ${found.join(", ")}, which older browsers don't support`);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, css);
  console.log(`${path.relative(root, to)}  ${(css.length / 1024).toFixed(1)} kB`);
};

await build();

if (process.argv.includes("--watch")) {
  let timer;
  fs.watch(path.join(root, "styles"), { recursive: true }, (event, file) => {
    if (!file?.endsWith(".css")) return;
    clearTimeout(timer);
    timer = setTimeout(() => build().catch((e) => console.error(e.message)), 100);
  });
  console.log("Watching styles/ for changes…");
}
