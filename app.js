var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = express();
var port = 13367;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

var routes = require(__dirname + "/routes.js");
app.use("/", routes);

app.listen(port, function () {
  console.log("App started: http://localhost:" + port + "/");
});
