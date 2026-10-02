import { Router } from "express";
const router = Router();
import nav from "./navigation.js";
import { search } from "./search.js";
import data from "./examples-data.js";
import fs from "node:fs";
import zlib from "node:zlib";

// A few facts about Nausikaä itself, for the frontpage and the footer: the
// version, and how large the stylesheet is. The sizes are measured again
// when the stylesheet has been rebuilt.
const version = JSON.parse(fs.readFileSync(new URL("./package.json", import.meta.url))).version;
const stylesheet = new URL("./public/styles/nausikaa.min.css", import.meta.url);
let measured = { at: 0 };
const site = () => {
  try {
    const changed = fs.statSync(stylesheet).mtimeMs;
    if (changed !== measured.at) {
      const css = fs.readFileSync(stylesheet);
      const icons = fs.readFileSync(new URL("./public/images/icons.svg", import.meta.url), "utf8");
      measured = {
        at: changed,
        size: Math.round(css.length / 1000),
        gzipped: Math.round(zlib.gzipSync(css).length / 1000),
        built: new Date(changed),
        icons: { size: Math.round(Buffer.byteLength(icons) / 1000), count: (icons.match(/<symbol /g) ?? []).length },
      };
    }
  } catch {}
  return { version, ...measured };
};

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
  // The form may name the part of the page to return to
  const part = /^#[\w-]+$/.test(req.body?.back ?? "") ? req.body.back : "";
  try {
    const referer = new URL(req.get("referer"));
    if (referer.host === req.get("host")) return referer.pathname + referer.search + part;
  } catch {}
  return "/";
};

// Every page gets the facts about the site
router.use((req, res, next) => {
  res.locals.site = site();
  next();
});

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
