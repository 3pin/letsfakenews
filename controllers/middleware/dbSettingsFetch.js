const debug = require('debug')('middleware');
const Settings = require('../../models/settings.model');

module.exports = (req, res, next) => {
  debug("Entered middleware to fetch 'dbSettings'");
  const { room } = req.query;
  // find settings schemas
  Settings.findOne({ room }).then((data) => {
    debug(data);
    // attached settings.documents to all reqs
    req.dbSettings = data;
    next();
  }).catch((err) => {
    res.status(500).end();
    next(err);
  });
};
