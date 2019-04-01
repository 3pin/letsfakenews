'use strict';
const debug = require('debug')('routes_settings');

/* declare a new router */
const routes = require('express').Router();

/* routes */
const sse = require('../controllers/settings/sse');
const mode = require('../controllers/settings/mode');
const activelist = require('../controllers/settings/activelist');

/* this router */
routes.get('/sse', sse);
routes.get('/mode', mode);
routes.get('/activelist', activelist);

module.exports = routes;
