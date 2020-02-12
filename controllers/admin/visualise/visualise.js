'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsFetch = require('../../middleware/dbSettingsFetch');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/GET /admin/visualise');
  let dbSettings = req.dbSettings;
  bus.emit('activelistChange', dbSettings.activelist.length);
  res.json({
    activelistLength: dbSettings.activelist.length,
    visualiseNum: dbSettings.visualise,
    textScrollers: dbSettings.text_scrollers,
    imageDuration: dbSettings.image_duration
  });
}
