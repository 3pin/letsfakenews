
const debug = require('debug')('routes_admin');
// tap into an sse event-bus
const bus = require('../../../modules/eventbus');

module.exports = (req, res) => {
  debug('/GET /admin/visualise');
  const { dbSettings } = req;
  bus.emit('activelistChange', dbSettings.activelist.length);
  res.json({
    activelistLength: dbSettings.activelist.length,
    visualiseNum: dbSettings.visualise,
    textScrollers: dbSettings.textScrollers,
    imageDuration: dbSettings.imageDuration,
  });
};
