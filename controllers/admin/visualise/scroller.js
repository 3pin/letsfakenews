
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
    bus.emit('activelistChange', dbSettings.activelist.length);
    res.send({
      textScrollers: dbSettings.textScrollers,
    });
  });
};
