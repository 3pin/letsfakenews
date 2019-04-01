'use strict';
const debug = require('debug')('routes_settings');

/* declare a new router */
const routes = require('express').Router();

/* routes */
const sse = require('../controllers/settings/sse');
const mode = require('../controllers/settings/mode');
const activelist = require('../controllers/settings/activelist');

const cors = require('cors');
// Set up a whitelist and check against it:
const whitelist = [`http://localhost:${process.env.REACT_PORT}`, `${process.env.FRONTEND_URL}/admin/stories`, `${process.env.FRONTEND_URL}/admin/feedback`]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

/* this router */
routes.get('/sse', cors(), sse);
routes.get('/mode', mode);
routes.get('/activelist', activelist);

module.exports = routes;
