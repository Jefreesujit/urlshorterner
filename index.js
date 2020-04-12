const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const http = require('http').Server(app);

const { appUrl } = require('./config.js');
const { getRecord, setRecord } = require('./dbservice.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/src', express.static('src'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Max-Age', "86400");
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // res.status(404).json({ status: 'NotFound'})
});

app.post('/shortenUrl', async (req, res) => {
  const key = Math.random().toString(36).slice(6);
  const url = `${appUrl}/${key}`;
  console.log(req);
  setRecord({ urlKey: key, url: req.body.url }).then((response) => {
    res.send({key, url});
  }).catch(e => {
    console.log('Error', e);
    res.status(400).send(e);
  });
});

app.get('/:urlKey', async (req, res) => {
  if (req.params.urlKey) {
    getRecord(req.params.urlKey)
      .then((response) => {
        const [{ url }] = JSON.parse(response);
        res.redirect(url);
      })
      .catch((e) => {
        console.log("Error", e);
        res.status(400).send(e);
      });
  } else {
    res.status(404).end();
  }
});

http.listen(process.env.PORT || 3009, () => {
  console.log('listening on port ' + http.address().port);
});
