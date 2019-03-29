'use strict';

const debug = require('debug')('routes_settings');

module.exports = (req, res) => {
  // serve mode-data to client
  debug('/GET routes/mode');
  let dbSettings = req.dbSettings;
  let mode = process.env.NODE_ENV;
  let autolive = req.app.locals.autolive;
  res.send({
    mode: mode,
    autolive: autolive,
    dbSettings: dbSettings
  });
}