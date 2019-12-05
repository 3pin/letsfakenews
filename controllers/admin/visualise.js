'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// import mongoose Settings model
const Settings = require('../../models/settings.model');

module.exports = (req, res) => {
  let visualise = req.body.visualise;
  let dbSettings = req.dbSettings;
  dbSettings.visualise = visualise;
  res.json({
    visualise: visualise
  });
  dbSettingsUpdate(dbSettings).then((docs) => {
    debug(docs);
  })
}
