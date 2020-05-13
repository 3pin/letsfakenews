
const debug = require('debug')('controller');
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  debug(req.query.room);
  let dbSettings;
  for (let i = 0; i < req.dbSettings.length; i += 1) {
    if (req.dbSettings[i].room === req.query.room) {
      dbSettings = req.dbSettings[i];
      break;
    }
  }
  debug(dbSettings);
  debug(`About to switch autolive status...status currently set to: ${dbSettings.autolive}`);
  if (dbSettings.autolive === true) {
    debug('Setting to FALSE');
    dbSettings.autolive = false;
    dbSettingsUpdate(dbSettings, req.query.room).then(() => {
      res.send({
        autolive: false,
      });
    });
  } else {
    debug('Setting to TRUE');
    dbSettings.autolive = true;
    dbSettingsUpdate(dbSettings, req.query.room).then(() => {
      res.send({
        autolive: true,
      });
    });
  }
};
