'use strict';

/* module debugging */
const debug = require('debug')('routes_index');

/* declare a new router */
const routes = require('express').Router();

/* routes */
const write = require('./write/index');
const watch = require('./watch/index');
const admin = require('./admin/index');
const settings = require('./settings/index');
/*
//=============================================================================
// authenticate
const auth = require("http-auth");
const digest = auth.digest({
  realm: "Private area",
  file: "./htpasswd",
  authType: "digest"
});
function middleware_auth(req, res, next) {
  console.log('middleware_auth: this page requires authentification');
  (auth.connect(digest))(req, res, next);
  next();
}
*/
//=============================================================================
// REACT connections: from Landing
routes.use('/write', write);
routes.use('/watch', watch);
routes.use('/admin', admin);
routes.use('/settings', settings);

module.exports = routes;
