'use strict';

const debug = require('debug')('routes_watch');

module.exports = (req, res) => {
  debug('/GET /watch/visualise');
  // use middleware to fetch db settings
  let dbSettings = req.dbSettings;
  debug(dbSettings.activelist)
  res.json({
    activelist: dbSettings.activelist,
    visualise: dbSettings.visualise
  });
};
