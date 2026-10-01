import nav from "../../navigation.js";

export const themes = ["light", "dark"];

// Every page of the site, derived from the navigation.
export const pages = ["/", "/download", "/search?q=color", "/documentation"];
for (const lane of nav) {
  if (lane.slug === "documentation") {
    for (const group of lane.nav) {
      for (const page of group.nav) pages.push(`/documentation/${group.slug}/${page.slug}`);
    }
  } else if (lane.slug === "examples") {
    pages.push("/examples");
    for (const page of lane.nav) pages.push(`/examples/${page.slug}`);
  }
}

export const pageName = (path) => (path === "/" ? "frontpage" : path.slice(1).replaceAll("/", "--").replace(/[?=]/g, "-"));

// Calendars and date pickers show the current date, and the front page draws
// a random skyline; freeze both so screenshots stay comparable between runs.
export const openPage = async (page, path, theme) => {
  await page.context().addCookies([{ name: "theme", value: theme, url: "http://localhost:13367" }]);
  await page.clock.setFixedTime(new Date("2026-09-30T10:00:00"));
  await page.addInitScript(() => {
    let seed = 42;
    Math.random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  });
  await page.goto(path, { waitUntil: "networkidle" });
};
