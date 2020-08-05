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
      // attach settings to all reqs
      req.dbSettings = data;
      next();
    }).catch((err) => {
      res.status(500).end();
      next(err);
    });
  } catch (err) {
    next(err);
  }
};
