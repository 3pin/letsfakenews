'use strict';
const debug = require('debug')('routes_settings');

/* declare a new router */
const routes = require('express').Router();

/* routes */
const sse = require('../controllers/settings/sse');
const mode = require('../controllers/settings/mode');
const activelist = require('../controllers/settings/activelist');
//const password = require('../controllers/settings/password');
const checkToken = require('../controllers/settings/checktoken');
const authenticate = require('../controllers/settings/authenticate');
const checkDevice = require('../controllers/settings/checkdevice');

/* sub to SSE */
routes.get('/sse', sse);
/* fetch mode from db */
routes.get('/mode', mode);
/* fetch activelist from db */
routes.get('/activelist', activelist);
/* fetch password from db */
//routes.get('/password', password);
/* check if the user has an authToken... if not ask them to login */
routes.get('/checkToken', checkToken);
/* authenticate login:username/password against db */
routes.post('/authenticate', authenticate);
/* check device Type ... desktop or mobile? */
routes.get('/checkDevice', checkDevice);

module.exports = routes;
