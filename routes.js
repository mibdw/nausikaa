import { Router } from "express";
const router = Router();
import nav from "./navigation.js";
import { search } from "./search.js";
import data from "./examples-data.js";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The themes a visitor can choose; without a choice the system setting decides.
const themes = ["light", "dark", "eink"];

// The chosen theme: "light", "dark", "eink", or "auto" to follow the system setting.
// Also accepts the cookie values used before the single stylesheet.
const themeOf = (req) => {
  const value = (req.cookies.theme || "").replace(/^nausikaa-/, "");
  return themes.includes(value) ? value : "auto";
};

// Where to go after switching themes: back to the page the visitor came
// from, but only when that page is on this site.
const backTo = (req) => {
  try {
    const referer = new URL(req.get("referer"));
    if (referer.host === req.get("host")) return referer.pathname + referer.search;
  } catch {}
  return "/";
};

router.use("/documentation/:s1/:s2", (req, res) => {
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "documentation",
    params: req.params,
  });
});

router.use("/documentation", (req, res) => {
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "documentation",
    params: req.params,
  });
});

// An example gets sample data and the query, so its filters, tabs and
// pages really work.
const examples = nav.find((lane) => lane.slug === "examples").nav;
router.get("/examples/:s1", (req, res, next) => {
  if (!examples.some((example) => example.slug === req.params.s1)) return next();
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "examples",
    params: req.params,
    query: req.query,
    data,
  });
});

router.get("/examples", (req, res) => {
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "examples",
    params: req.params,
  });
});

// A test page for old and limited browsers, such as the one on a Kindle: it
// reports what the browser supports. The page sends its result back as the
// address of a picture; the results are kept in a file in the temporary
// folder, so they survive a restart of the server.
const einkReports = path.join(os.tmpdir(), "nausikaa-eink-reports.json");
const readEinkReports = () => {
  try {
    return JSON.parse(fs.readFileSync(einkReports, "utf8"));
  } catch {
    return [];
  }
};

router.get("/eink-test/report.gif", (req, res) => {
  const text = (value) => String(value ?? "").slice(0, 400);
  const reports = readEinkReports();
  reports.unshift({
    at: new Date().toISOString(),
    result: text(req.query.r),
    userAgent: text(req.query.ua),
    screen: text(req.query.screen),
    window: text(req.query.window),
    pixelRatio: text(req.query.ratio),
    address: req.ip,
  });
  fs.writeFileSync(einkReports, JSON.stringify(reports.slice(0, 50), null, 2));
  // The smallest picture there is: one transparent pixel
  res.type("gif").send(Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64"));
});

router.get("/eink-test/reports", (req, res) => {
  res.type("text/plain").send(JSON.stringify(readEinkReports(), null, 2));
});

router.get("/eink-test", (req, res) => {
  res.render("eink-test", { taps: Math.min(parseInt(req.query.tapped, 10) || 0, 999) });
});

// Suggestions for the search field in the navbar
router.get("/search.json", (req, res) => {
  res.json(search(req.query.q, 8));
});

// All results on a page of their own; this also works without JavaScript
router.get("/search", (req, res) => {
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "search",
    params: req.params,
    found: search(req.query.q, 50),
  });
});

router.use("/download", (req, res) => {
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "download",
    params: req.params,
  });
});

router.post("/theme-switch", (req, res) => {
  const theme = req.body.theme;
  if (themes.includes(theme)) {
    res.cookie("theme", theme, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      httpOnly: true,
    });
  } else {
    res.clearCookie("theme", { path: "/" });
  }
  res.redirect(backTo(req));
});

router.use("/", (req, res) => {
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "frontpage",
    params: req.params,
  });
});

export default router;
