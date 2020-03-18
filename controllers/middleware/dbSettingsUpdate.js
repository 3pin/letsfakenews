const debug = require('debug')('middleware');
const Settings = require('../../models/settings.model');

module.exports = (dbSettings) => {
  debug("Running Func to update 'dbSettings'");
  return new Promise(((resolve) => {
    Settings.findOneAndUpdate({}, dbSettings, {
      new: true,
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      debug(err);
    });
  }));
};
