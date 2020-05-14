
const debug = require('debug')('controller');
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  debug(req.body.data);
  debug(req.query);
  let dbSettings;
  for (let i = 0; i < req.dbSettings.length; i += 1) {
    if (req.dbSettings[i].room === req.query.room) {
      dbSettings = req.dbSettings[i];
      break;
    }
  }
  // debug(dbSettings);
  dbSettings.autolive = req.body.data;
  dbSettingsUpdate(dbSettings, req.query.room).then(() => {
    res.send({
      autolive: req.body.data,
    });
  });
};
