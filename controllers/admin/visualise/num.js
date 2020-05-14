
const debug = require('debug')('controller');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/num');
  const {
    room,
  } = req.query;
  const { visualiseNum } = req.body.data;
  debug(room, visualiseNum);
  const { dbSettings } = req.dbSettings;
  dbSettings.visualise = visualiseNum;
  dbSettingsUpdate(dbSettings, room).then((result) => {
    debug(result);
    bus.emit('activelistChange', dbSettings.activelist.length);
    res.json({
      visualiseNum: result.visualise,
    });
  });
};
