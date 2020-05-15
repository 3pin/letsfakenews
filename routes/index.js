
/* module debugging */
const debug = require('debug')('room');

/* declare a new router */
const routes = require('express').Router();

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
//= ============================================================================
routes.use('/write', write);
routes.use('/watch', watch);
routes.use('/admin', admin);
routes.use('/settings', settings);

module.exports = routes;
