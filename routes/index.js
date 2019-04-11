'use strict';

/* module debugging */
const debug = require('debug')('routes_index');

/* declare a new router */
const routes = require('express').Router();
/* load middleware */
const withAuth = require('../controllers/middleware/withAuth');

/* routes */
const write = require('./write');
const watch = require('./watch');
const admin = require('./admin');
const settings = require('./settings');
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
routes.use('/watch', deviceType, watch);
routes.use('/admin', withAuth, admin);
routes.use('/settings', settings);

module.exports = routes;
