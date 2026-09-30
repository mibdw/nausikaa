import { defineConfig, devices } from "@playwright/test";

// Visual regression and contrast checks for the documentation site.
// The screenshots are a local baseline and are not committed.
export default defineConfig({
  testDir: "tests/visual",
  snapshotPathTemplate: "tests/visual/__screenshots__/{projectName}/{arg}{ext}",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: { animations: "disabled", maxDiffPixelRatio: 0.001 },
  },
  use: {
    baseURL: "http://localhost:13367",
    viewport: { width: 1300, height: 900 },
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1300, height: 900 } } },
    { name: "firefox", use: { ...devices["Desktop Firefox"], viewport: { width: 1300, height: 900 } } },
  ],
  webServer: {
    command: "node app.js",
    url: "http://localhost:13367",
    reuseExistingServer: true,
  },
});
