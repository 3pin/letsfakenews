'use strict';

const databases = require('express').Router();
const main = require('./main');
const feedback = require('./feedback');
const clear = require('./clear');
const feedback_clear = require('./feedback_clear');
const remove = require('./remove');
const autolive = require('./autolive');
const storylive = require('./storylive');
const refresh = require('./refresh');

const auth = require("http-auth");
const digest = auth.digest({
  realm: "Private area",
  file: "./htpasswd",
  authType: "digest"
});

function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
}

/* this router */
databases.get('/', middleware_auth, main);
databases.get('/feedback', feedback);
databases.delete('/clear', clear);
databases.delete('/feedback_clear', feedback_clear);
databases.delete('/remove', remove);
databases.put('/autolive', autolive);
databases.put('/storylive', storylive);
databases.put('/refresh', refresh);

module.exports = databases;
