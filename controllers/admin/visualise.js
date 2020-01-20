'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// import mongoose Settings model
const Settings = require('../../models/settings.model');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  req.dbSettings.visualise = req.body.visualise;
  dbSettingsUpdate(req.dbSettings).then((docs) => {
    debug(docs);
    bus.emit('activelistChange', req.dbSettings.activelist.length);
  }).then(() => {
    res.json({
      visualise: req.body.visualise
    });
  })
}
