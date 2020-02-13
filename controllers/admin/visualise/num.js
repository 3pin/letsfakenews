'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/num');
  let dbSettings = req.dbSettings;
  //debug(req.body.visualiseNum);
  dbSettings.visualise = req.body.visualiseNum;
  dbSettingsUpdate(dbSettings).then((result) => {
    debug(result);
    bus.emit('activelistChange', dbSettings.activelist.length);
    res.json({
      visualiseNum: result.visualise
    });
  })
}