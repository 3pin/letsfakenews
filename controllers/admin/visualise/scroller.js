'use strict';

const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/scroller');
  let dbSettings = req.dbSettings;
  debug(req.body.textScrollers);
  dbSettings.text_scrollers = req.body.textScrollers;
  dbSettingsUpdate(dbSettings).then((result) => {
    debug(result);
    res.json({
      textScrollers: result.text_scrollers
    });
  })
}
