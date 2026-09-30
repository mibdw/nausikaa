import { test, expect } from "@playwright/test";

// The theme follows the system setting until the visitor picks one in the
// navbar; the choice is remembered in a cookie.
test.skip(({ browserName }) => browserName !== "chromium", "theme behavior is checked in one browser");

const background = (page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--nausikaa-base").trim());

const choose = async (page, title) => {
  await page.locator(".theme-switcher > button").focus();
  await page.locator(".theme-switcher .panel button", { hasText: title }).click();
  await page.waitForLoadState("networkidle");
};

for (const scheme of ["light", "dark"]) {
  test(`follows a ${scheme} system setting by default`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/documentation");
    await expect(page.locator("html")).not.toHaveAttribute("data-theme");
    expect(await background(page)).toBe(scheme === "dark" ? "#222" : "#eff1f5");
  });
}

test("a chosen theme overrides the system setting and is remembered", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/documentation/elements/buttons");

  await choose(page, "Light");
  await expect(page).toHaveURL(/\/documentation\/elements\/buttons$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await background(page)).toBe("#eff1f5");

  await page.goto("/documentation");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await choose(page, "Automatic");
  await expect(page.locator("html")).not.toHaveAttribute("data-theme");
  expect(await background(page)).toBe("#222");
  expect((await page.context().cookies()).find((c) => c.name === "theme")).toBeUndefined();
});

test("the theme menu opens with the keyboard", async ({ page }) => {
  await page.goto("/documentation");
  const panel = page.locator(".theme-switcher .panel");
  await expect(panel).toHaveCSS("opacity", "0");
  await page.locator(".theme-switcher > button").focus();
  await expect(panel).toHaveCSS("opacity", "1");
  await page.keyboard.press("Tab");
  await expect(page.locator(".theme-switcher .panel button").first()).toBeFocused();
});

test("switching only redirects back to pages on this site", async ({ request }) => {
  const response = await request.post("/theme-switch", {
    form: { theme: "dark" },
    headers: { referer: "https://example.com/somewhere" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(302);
  expect(response.headers()["location"]).toBe("/");
});
