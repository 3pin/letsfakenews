'use strict';
const debug = require('debug')('displays_index')

const displays = require('express').Router();
const main = require('./main');
const request_new_story = require('./request_new_story');

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

/* this router */
displays.get('/', middleware_auth, main);
displays.get('/request_new_story', request_new_story);

module.exports = displays;
