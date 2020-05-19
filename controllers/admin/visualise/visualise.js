
const debug = require('debug')('controller');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/GET /admin/visualise');
  const {
    room,
  } = req.query;
  debug(room);
  const { dbSettings } = req;
  const activelistObj = {
    room,
    update: dbSettings.activelist.length,
  }
  bus.emit('activelistChange', activelistObj);
  // bus.emit('activelistChange', dbSettings.activelist.length);
  res.send({
    activelistLength: dbSettings.activelist.length,
    visualiseNum: dbSettings.visualise,
    textScrollers: dbSettings.textScrollers,
    imageDuration: dbSettings.imageDuration,
  });
};
