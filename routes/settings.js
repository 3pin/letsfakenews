'use strict';
const debug = require('debug')('routes_settings');

/* declare a new router */
const routes = require('express').Router();

/* routes */
const sse = require('../controllers/settings/sse');
const mode = require('../controllers/settings/mode');
const activelist = require('../controllers/settings/activelist');

const cors = require('cors');
const corsOptions = {
  origin: `http://localhost:${process.env.REACT_PORT}`
}
const whitelist = [`http://localhost:${process.env.REACT_PORT}`, process.env.WHITELIST_REMOTE]
const corsOptions_whitelist = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    // reflect (enable) the requested origin in the CORS response
    corsOptions = {origin: true}
  } else {
    // disable CORS for this request
    corsOptions = {origin: false}
  }
  // callback expects two parameters: error and options
  callback(null, corsOptions)
}

/* this router */
routes.get('/sse', cors(corsOptions), sse);
routes.get('/mode', mode);
routes.get('/activelist', activelist);

module.exports = routes;
