'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  let dbSettings = req.dbSettings;
  dbSettings.visualise = req.body.visualise;
  dbSettingsUpdate(dbSettings).then((docs) => {
    debug(docs);
    bus.emit('activelistChange', dbSettings.activelist.length);
  }).then(() => {
    res.json({
      visualise: dbSettings.visualise
    });
  })
}
