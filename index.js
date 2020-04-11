const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const directory = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/shorternUrl', (req, res) => {
  const key = Math.random().toString(36).slice(6);
  console.log(req.body)
  directory[key] = req.body.url;
  const url = `${req.headers.host}/${key}`;
  res.json({ key, url });
});

app.get('/:urlKey', (req, res) => {
  console.log(req.params);
  console.log(directory);
  const url = directory[req.params.urlKey];
  res.redirect(url);
});

http.listen(process.env.PORT || 3009, () => {
  console.log("listening on port " + http.address().port);
});
