'use strict';
const debug = require('debug')('databases_index')

const databases = require('express').Router();
const main = require('./main');
const remove = require('./remove');
const feedback = require('./feedback');

const auth = require("http-auth");
const digest = auth.digest({
  realm: "Private area",
  file: "./htpasswd",
  authType: "digest"
});
function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
  //return next()
}

/* this router's routes */
databases.get('/', middleware_auth, main);
databases.get('/feedback', feedback);
/* this router's endpoints */
databases.delete('/', remove);

module.exports = databases;
