'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsFetch = require('../../middleware/dbSettingsFetch');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/GET /admin/visualise');
  let dbSettings = req.dbSettings;
  res.json({
    activelistLength: dbSettings.activelist.length,
    visualiseNum: dbSettings.visualise
  });
}
