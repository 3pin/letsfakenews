'use strict';

// module debugging
const debug = require('debug')('routes_watch');

/* declare a new router */
const watch = require('express').Router();
/* routes */
const display = require('./display');
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
// REACT connection
watch.get('/', (req, res) => {
  debug("'REACT /watch' says 'Hello' ");
  res.send({ express: "Hello 'REACT /watch' " });
});
watch.get('/watch/watch', display);
//watch.get('/', middleware_auth, main);
watch.get('/watch/request_new_story', request_new_story);

module.exports = watch;
