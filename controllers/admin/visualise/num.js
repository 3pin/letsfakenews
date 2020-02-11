'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/num');
  let dbSettings = req.dbSettings;
  dbSettings.visualise = req.data;
  dbSettingsUpdate(dbSettings).then(() => {
    res.json({
      visualiseNum: dbSettings.visualise
    });
  })
}
