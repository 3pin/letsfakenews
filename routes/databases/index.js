'use strict';
const debug = require('debug')('databases_index')

const databases = require('express').Router();
const main = require('./main');
const feedback = require('./feedback');
const clear = require('./clear');
const remove = require('./remove');

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

/* this router's routes */
databases.get('/', middleware_auth, main);
databases.get('/feedback', feedback);
databases.delete('/clear', clear);
databases.delete('/remove', remove);
databases.post('/autolive', (req, res) => {
  debug('autolive: ' + req.body.autolive);
  req.app.locals.autolive = req.body.autolive;
  debug('app.locals autolive: ' + req.app.locals.autolive);
  res.send('Autolive status set');
});

module.exports = databases;
