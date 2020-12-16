var express = require("express");
var router = express.Router();

var nav = require("./navigation.js");

router.use("/documentation/:s1/:s2", function(req, res) {
  res.render("main", {
    nav: nav,
    lane: "documentation",
    params: req.params
  });
});

router.use("/documentation", function(req, res) {
  res.render("main", {
    nav: nav,
    lane: "documentation",
    params: req.params
  });
});

router.use("/examples/:s1", function(req, res) {
  res.render("main", {
    nav: nav,
    lane: "examples",
    params: req.params
  });
});

router.use("/about", function(req, res) {
  res.render("main", {
    nav: nav,
    lane: "about",
    params: req.params
  });
});

router.use("/download", function(req, res) {
  res.render("main", {
    nav: nav,
    lane: "download",
    params: req.params
  });
});

router.use("/", function(req, res) {
  res.render("main", {
    nav: nav,
    lane: "frontpage",
    params: req.params
  });
});

module.exports = router;
