import fs from "node:fs";
import { test, expect } from "@playwright/test";
import { pages, themes, openPage } from "./pages.js";

// Counts text that fails WCAG AA contrast (4.5:1, or 3:1 for large text) on
// every page and compares it with contrast-baseline.json: a page may not get
// worse. Refresh the baseline after an improvement with:
// npm run test:contrast:baseline
const baselineFile = new URL("./contrast-baseline.json", import.meta.url);
const baseline = fs.existsSync(baselineFile) ? JSON.parse(fs.readFileSync(baselineFile, "utf8")) : {};
const measured = {};

// Runs in the browser: returns the text elements with too little contrast.
const findLowContrast = () => {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const blend = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  });
  // The visible background: blend translucent layers up to the first opaque
  // one. Background images can't be judged, so those elements are skipped.
  const background = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage !== "none" && !cs.backgroundImage.includes("gradient")) return null;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) {
        layers.push(c);
        if (c.a >= 1) break;
      }
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) bg = blend(layers[i], bg);
    return bg;
  };

  const failures = [];
  const seen = new Set();
  const walker = document.createTreeWalker(document.querySelector("main") || document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const el = walker.currentNode.parentElement;
    if (!walker.currentNode.textContent.trim() || seen.has(el)) continue;
    seen.add(el);
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    if (cs.visibility === "hidden" || !rect.width || !rect.height) continue;
    if (el.closest("pre, code, .code-example, svg, [aria-hidden=true], :disabled, .disabled, [disabled], .loading")) continue;
    let opacity = 1;
    for (let e = el; e; e = e.parentElement) opacity *= +getComputedStyle(e).opacity;
    if (opacity < 0.15) continue;
    const bg = background(el);
    if (!bg) continue;
    const color = parse(cs.color);
    const fg = blend({ ...color, a: color.a * opacity }, bg);
    const [l1, l2] = [lum(fg), lum(bg)];
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(cs.fontSize);
    const large = size >= 24 || (+cs.fontWeight >= 700 && size >= 18.66);
    if (ratio < (large ? 3 : 4.5)) {
      failures.push(`${ratio.toFixed(2)}  "${walker.currentNode.textContent.trim().slice(0, 40)}"  ${cs.color} on rgb(${bg.r | 0}, ${bg.g | 0}, ${bg.b | 0})`);
    }
  }
  return failures;
};

test.describe("contrast", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "contrast is measured in one browser");

  for (const theme of themes) {
    for (const path of pages) {
      test(`${theme.replace("nausikaa-", "")} ${path}`, async ({ page }, testInfo) => {
        await openPage(page, path, theme);
        const failures = await page.evaluate(findLowContrast);
        (measured[theme] ??= {})[path] = failures.length;
        if (failures.length) await testInfo.attach("low-contrast.txt", { body: failures.join("\n"), contentType: "text/plain" });

        if (testInfo.config.updateSnapshots !== "none" && testInfo.config.updateSnapshots !== "missing") return;
        const allowed = baseline[theme]?.[path];
        if (allowed === undefined) return;
        expect(failures.length, `low-contrast text on ${path} (${theme})\n${failures.join("\n")}`).toBeLessThanOrEqual(allowed);
      });
    }
  }

  test.afterAll(async ({}, testInfo) => {
    const update = !["none", "missing"].includes(testInfo.config.updateSnapshots);
    if (!update && Object.keys(baseline).length) return;
    // Merge, since workers each measure part of the pages.
    const current = fs.existsSync(baselineFile) ? JSON.parse(fs.readFileSync(baselineFile, "utf8")) : {};
    for (const [theme, counts] of Object.entries(measured)) Object.assign((current[theme] ??= {}), counts);
    fs.writeFileSync(baselineFile, JSON.stringify(current, null, 2) + "\n");
  });
});
