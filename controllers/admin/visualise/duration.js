
const debug = require('debug')('controller');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/duration');
  const {
    room,
  } = req.query;
  const { imageDuration } = req.body.data;
  debug(room, imageDuration);
  const { dbSettings } = req;
  dbSettings.imageDuration = imageDuration;
  dbSettingsUpdate(dbSettings, room).then((result) => {
    debug(result);
    const activelistObj = {
      room,
      update: dbSettings.activelist.length,
    }
    bus.emit('activelistChange', activelistObj);
    // bus.emit('activelistChange', dbSettings.activelist.length);
    res.send({
      imageDuration: result.imageDuration,
    });
  });
};
