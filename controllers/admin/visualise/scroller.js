
const debug = require('debug')('controller');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/scroller');
  const {
    room,
  } = req.query;
  const { textScrollers } = req.body.data;
  debug(room, textScrollers);
  const { dbSettings } = req;
  dbSettings.textScrollers = textScrollers;
  dbSettingsUpdate(dbSettings, room).then((result) => {
    debug(result);
    const activelistObj = {
      room,
      update: dbSettings.activelist.length,
    }
    bus.emit('activelistChange', activelistObj);
    // bus.emit('activelistChange', dbSettings.activelist.length);
    res.send({
      textScrollers: dbSettings.textScrollers,
    });
  }).catch((err) => {
    debug('Err: ', err);
    res.status(500).json({
      message: 'DB_ERROR',
    });
  });
};
