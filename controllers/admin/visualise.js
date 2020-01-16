'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// import mongoose Settings model
const Settings = require('../../models/settings.model');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  let visualise = req.body.visualise;
  let dbSettings = req.dbSettings;
  dbSettings.visualise = visualise;
  res.json({
    visualise: visualise
  });
  dbSettingsUpdate(dbSettings).then((docs) => {
    debug(docs);
    bus.emit('activelistChange', dbSettings.activelist.length);
  })
}
