import { Router } from "express";
const router = Router();
import nav from "./navigation.js";

// The chosen theme: "light", "dark", or "auto" to follow the system setting.
// Also accepts the cookie values used before the single stylesheet.
const themeOf = (req) => {
  const value = (req.cookies.theme || "").replace(/^nausikaa-/, "");
  return value === "light" || value === "dark" ? value : "auto";
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

router.use("/examples/:s1", (req, res) => {
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "examples",
    params: req.params,
  });
});

router.use("/about", (req, res) => {
  res.render("main", {
    nav,
    theme: themeOf(req),
    lane: "about",
    params: req.params,
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
  if (theme === "light" || theme === "dark") {
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
