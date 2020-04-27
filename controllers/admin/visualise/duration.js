
const debug = require('debug')('routes_admin');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/duration');
  const { dbSettings } = req;
  debug(req.body.imageDuration);
  dbSettings.imageDuration = req.body.imageDuration;
  dbSettingsUpdate(dbSettings).then((result) => {
    debug(result);
    bus.emit('activelistChange', dbSettings.activelist.length);
    res.json({
      imageDuration: result.imageDuration,
    });
  });
};
