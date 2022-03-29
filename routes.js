var express = require("express");
var router = express.Router();

var nav = require("./navigation.js");

router.use("/documentation/:s1/:s2", function (req, res) {
  res.render("main", {
    nav: nav,
    theme: req.cookies.theme,
    lane: "documentation",
    params: req.params,
  });
});

router.use("/documentation", function (req, res) {
  res.render("main", {
    nav: nav,
    theme: req.cookies.theme,
    lane: "documentation",
    params: req.params,
  });
});

router.use("/examples/:s1", function (req, res) {
  res.render("main", {
    nav: nav,
    theme: req.cookies.theme,
    lane: "examples",
    params: req.params,
  });
});

router.use("/about", function (req, res) {
  res.render("main", {
    nav: nav,
    theme: req.cookies.theme,
    lane: "about",
    params: req.params,
  });
});

router.use("/download", function (req, res) {
  res.render("main", {
    nav: nav,
    theme: req.cookies.theme,
    lane: "download",
    params: req.params,
  });
});

router.post("/theme-switch", function (req, res) {
  res.cookie("theme", req.body.theme);
  res.redirect("back");
});

router.use("/", function (req, res) {
  res.render("main", {
    nav: nav,
    theme: req.cookies.theme,
    lane: "frontpage",
    params: req.params,
  });
});

module.exports = router;
