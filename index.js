var express = require('express')
var app = express();
var http = require('http').Server(app);

var directory = {};

app.get('/fonts/roboto/*', function(req,res){
  var fileName = req.url.substring(req.url.indexOf('Roboto'));
  res.sendFile(__dirname + '/fonts/roboto/' + fileName);
});

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/shorternUrl', function(req,res) {
  var key = Math.random().toString(36).slice(6);
  console.log(key);
  directory[key] = req.query.url;
  res.send({key: key});
});

app.get('/:urlKey', function(req,res) {
  var url = directory[req.params.urlKey];
  res.redirect(url);
});

http.listen(process.env.PORT || 3009, function(){
  console.log("listening on port " + http.address().port);
});
