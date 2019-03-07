'use strict';
const debug = require('debug')('routes_settings');

/* declare a new router */
const routes = require('express').Router();

/* routes */
const sse = require('./sse');
const mode = require('./mode');

/* this router */
routes.get('/sse', sse);
routes.get('/mode', mode);

module.exports = routes;
