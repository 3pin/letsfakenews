'use strict';

const debug = require('debug')('routes_admin');
const Settings = require('../../models/settings.model');

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  let dbSettings = req.dbSettings;
  debug('About to switch autolive status...status currently set to: ' + dbSettings.autolive);
  if (dbSettings.autolive === true) {
    debug('Setting to FALSE');
    dbSettings.autolive = false;
    res.json({
      autolive: false
    });
  } else {
    debug('Setting to TRUE');
    dbSettings.autolive = true;
    res.json({
      autolive: true
    });
  }
  Settings.findOneAndUpdate({}, {
      autolive: dbSettings.autolive
    }, {
      new: true
    })
    .then((res) => {
      debug('response');
      debug(res);
    });
}
