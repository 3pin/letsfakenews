'use strict';

const debug = require('debug')('routes_settings');

module.exports = (req, res) => {
  // serve mode-data to client
  debug('/GET routes/mode');
  let dbSettings = req.dbSettings;
  res.send({
    dbSettings: dbSettings
  });
}
