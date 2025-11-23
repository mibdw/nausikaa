import { Router } from "express";
const router = Router();
import nav from "./navigation.js";

router.use("/documentation/:s1/:s2", (req, res) => {
  res.render("main", {
    nav,
    theme: req.cookies.theme,
    lane: "documentation",
    params: req.params,
  });
});

router.use("/documentation", (req, res) => {
  res.render("main", {
    nav,
    theme: req.cookies.theme,
    lane: "documentation",
    params: req.params,
  });
});

router.use("/examples/:s1", (req, res) => {
  res.render("main", {
    nav,
    theme: req.cookies.theme,
    lane: "examples",
    params: req.params,
  });
});

router.use("/about", (req, res) => {
  res.render("main", {
    nav,
    theme: req.cookies.theme,
    lane: "about",
    params: req.params,
  });
});

router.use("/download", (req, res) => {
  res.render("main", {
    nav,
    theme: req.cookies.theme,
    lane: "download",
    params: req.params,
  });
});

router.post("/theme-switch", (req, res) => {
  res.cookie("theme", req.body.theme);
  res.redirect(req.get("referer") || "/");
});

router.use("/", (req, res) => {
  res.render("main", {
    nav,
    theme: req.cookies.theme,
    lane: "frontpage",
    params: req.params,
  });
});

export default router;
