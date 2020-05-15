const debug = require('debug')('middleware');
const Settings = require('../../models/settings.model');

module.exports = (dbSettings, room) => {
  debug("Entered func to update 'dbSettings'");
  return new Promise(((resolve) => {
    Settings.findOneAndUpdate({
      room,
    }, dbSettings, {
      new: true,
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      debug(err);
    });
  }));
};
