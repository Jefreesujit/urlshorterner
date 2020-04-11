const request = require('request');
const { databaseUrl } = require('./config.js');

const headerConfig = {
  "cache-control": "no-cache",
  "x-apikey": process.env.API_KEY,
  "content-type": "application/json",
};


const getRecord = async (key) => {
  const options = {
    method: "GET",
    url: `${databaseUrl}?q={"urlKey": "${key}"}`,
    headers: headerConfig,
  };

  console.log(options);

  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

const setRecord = async (data) => {
  const options = {
    method: "POST",
    url: databaseUrl,
    headers: headerConfig,
    body: data,
    json: true,
  };
  console.log(options);
  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  setRecord,
  getRecord,
};
