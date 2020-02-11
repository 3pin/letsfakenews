'use strict';

const debug = require('debug')('routes_admin');
const Settings = require('../../../models/settings.model');
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  let dbSettings = req.dbSettings;
  debug('About to switch autolive status...status currently set to: ' + dbSettings.autolive);
  if (dbSettings.autolive === true) {
    debug('Setting to FALSE');
    req.dbSettings.autolive = false;
    dbSettingsUpdate(req.dbSettings);
    res.json({
      autolive: false
    });
  } else {
    debug('Setting to TRUE');
    req.dbSettings.autolive = true;
    dbSettingsUpdate(req.dbSettings);
    res.json({
      autolive: true
    });
  }
}
