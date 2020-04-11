const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const http = require('http').Server(app);

const { appUrl } = require('./config.js');
const { getRecord, setRecord } = require('./dbservice.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(404).json({ status: 'NotFound'})
});

app.post('/shortenUrl', async (req, res) => {
  const key = Math.random().toString(36).slice(6);
  const url = `${appUrl}/${key}`;
  setRecord({ urlKey: key, url: req.body.url }).then((response) => {
    res.json({ key, url });
  }).catch(e => {
    console.log('Error', e);
  });
});

app.get('/:urlKey', async (req, res) => {
  getRecord(req.params.urlKey).then(response => {
    const [{ url }] = JSON.parse(response);
    res.redirect(url);
  }).catch(e => {
    console.log('Error', e);
  });
});

http.listen(process.env.PORT || 3009, () => {
  console.log(process.env);
  console.log('listening on port ' + http.address().port);
});
