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
const whitelist = [`http://localhost:${process.env.REACT_PORT}`, 'https://letsfakenews.herokuapp.com/', `https://letsfakenews.herokuapp.com/admin/stories`]
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
routes.get('/sse', cors(corsOptions), sse);
routes.get('/mode', mode);
routes.get('/activelist', activelist);

module.exports = routes;
