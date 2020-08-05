const debug = require('debug')('middleware');
const Settings = require('../../models/settings.model');

module.exports = (req, res, next) => {
  debug("Entered middleware to get 'dbSettings'");
  try {
    const { room } = req.query;
    debug(room);
    // find settings schemas
    Settings.findOne({ room }).then((data) => {
      debug(data);
      // attached settings.documents to all reqs
      req.dbSettings = data;
      req.dbSettings.nodeMode = 'development';
      next();
    }).catch((err) => {
      res.status(500).end();
      next(err);
    });
  } catch (err) {
    next(err);
  }
};
