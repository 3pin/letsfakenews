'use strict';
const debug = require('debug')('index');

/* declare a new router */
const routes = require('express').Router();

/* routes */
const sse = require('./sse');
const mode = require('./mode');

/* this router */
routes.get('/sse', sse);
routes.get('/mode', mode);

module.exports = routes;
