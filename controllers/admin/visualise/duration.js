'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/duration');
  let dbSettings = req.dbSettings;
  debug(req.body.imageDuration);
  dbSettings.image_duration = req.body.imageDuration;
  dbSettingsUpdate(dbSettings).then((result) => {
    debug(result);
    res.json({
      imageDuration: result.image_duration
    });
  })
}
