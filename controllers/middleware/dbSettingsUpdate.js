const debug = require('debug')('dbSettings');
const Settings = require('../../models/settings.model');

module.exports = (dbSettings) => {
  debug("Running Func to update 'dbSettings'");
  return new Promise(function (resolve, reject) {
    Settings.findOneAndUpdate({}, dbSettings, {
        new: true
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        debug(err);
      });
  })
}
