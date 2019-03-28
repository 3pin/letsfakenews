const debug = require('debug')('dbSettings');
const Settings = require('../../models/settings.model');

module.exports = (req, res, next) => {
  debug("Entered middleware fetching 'dbSettings'");
  // import mongoose schemas
  Settings.find({}).then((data) => {
    debug(data);
    req.dbSettings = data[0];
    next()
  }).catch(function (err) {
    res.status(500).end();
    next(err);
  })
}
