'use strict';
const debug = require('debug')('routes_settings');

/* declare a new router */
const routes = require('express').Router();
/* load middleware */
const withAuth = require('../controllers/middleware/withAuth');

/* routes */
const sse = require('../controllers/settings/sse');
const mode = require('../controllers/settings/mode');
const activelist = require('../controllers/settings/activelist');
const password = require('../controllers/settings/password');
const authenticate = require('../controllers/settings/authenticate');

/* this router */
routes.get('/sse', sse);
routes.get('/mode', mode);
routes.get('/activelist', activelist);
routes.get('/password', password);
routes.post('/authenticate', authenticate);
//
routes.get('/checkToken', withAuth, function(req, res) {
  debug('Ran withAuth middleware token-check');
  res.sendStatus(200);
});

module.exports = routes;
