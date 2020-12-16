var express = require('express');
var app = express();
var port = 13367;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var routes = require(__dirname + '/routes.js');
app.use('/', routes);

app.listen(port, function () { 
  console.log('App started: http://localhost:' + port + '/');
});
