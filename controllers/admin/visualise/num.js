
const debug = require('debug')('controller');
// load dbSettingsUpdate module
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/POST /admin/visualise/num');
  const { room } = req.query;
  debug(room);
  const { visualiseNum } = req.body.data;
  debug(visualiseNum);
  const { dbSettings } = req;
  debug(dbSettings);
  dbSettings.visualise = visualiseNum;
  debug(dbSettings);
  dbSettingsUpdate(dbSettings, room).then((result) => {
    debug(result);
    const activelistObj = {
      room,
      update: dbSettings.activelist.length,
    }
    bus.emit('activelistChange', activelistObj);
    // bus.emit('activelistChange', dbSettings.activelist.length);
    res.status(200)
      .json({
        visualiseNum: result.visualise,
      });
  }).catch((err) => {
    debug('Err: ', err);
    res.status(500).json({
      message: 'DB_ERROR',
    });
  });
};
