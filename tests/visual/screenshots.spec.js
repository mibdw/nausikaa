import { test, expect } from "@playwright/test";
import { pages, themes, pageName, openPage } from "./pages.js";

// Compares every page, in both themes, with the local baseline.
// Create or refresh the baseline with: npm run test:visual:baseline
for (const theme of themes) {
  for (const path of pages) {
    test(`${theme} ${path}`, async ({ page }) => {
      await openPage(page, path, theme);
      await expect(page).toHaveScreenshot(`${theme}/${pageName(path)}.png`, {
        fullPage: true,
        timeout: 30000,
      });
    });
  }
}
