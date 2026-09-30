// Builds the Nausikaä stylesheets: styles/light.css and styles/dark.css become
// public/styles/nausikaa-light.min.css and nausikaa-dark.min.css.
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
import { transform, browserslistToTargets } from "lightningcss";

const root = path.resolve(import.meta.dirname, "..");
const themes = ["light", "dark"];
const targets = browserslistToTargets(browserslist(undefined, { path: root }));
const processor = postcss([postcssImport(), postcssNesting({ edition: "2021", noIsPseudoSelector: true })]);

// Selectors the oldest supported browsers don't understand. Lightning CSS
// may introduce these when it rewrites selectors, so the build refuses them.
const unsupported = [":is(", ":where(", "-webkit-any(", "-moz-any("];

const build = async () => {
  for (const theme of themes) {
    const from = path.join(root, "styles", `${theme}.css`);
    const to = path.join(root, "public", "styles", `nausikaa-${theme}.min.css`);
    const flat = await processor.process(fs.readFileSync(from, "utf8"), { from });
    const { code, warnings } = transform({
      filename: from,
      code: Buffer.from(flat.css),
      minify: true,
      targets,
    });
    for (const w of [...flat.warnings(), ...warnings]) console.warn(`${theme}: ${w.text ?? w.message}`);
    const css = code.toString();
    const found = unsupported.filter((s) => css.includes(s));
    if (found.length) throw new Error(`${theme}: output contains ${found.join(", ")}, which older browsers don't support`);
    fs.writeFileSync(to, css);
    console.log(`${path.relative(root, to)}  ${(css.length / 1024).toFixed(1)} kB`);
  }
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
