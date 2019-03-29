const debug = require('debug')('middleware');
const Settings = require('../../models/settings.model');

module.exports = (req, res, next) => {
  debug("Entered middleware to fetch 'dbSettings'");
  // import mongoose schemas
  Settings.find({}).then((data) => {
    debug(data[0]);
    req.dbSettings = data[0];
    next();
  }).catch(function (err) {
    res.status(500).end();
    next(err);
  })
}
