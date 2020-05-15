
const debug = require('debug')('controller');
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  debug(req.body.data);
  debug(req.query);
  const { dbSettings } = req;
  dbSettings.autolive = req.body.data;
  dbSettingsUpdate(dbSettings, req.query.room).then(() => {
    res.status(200)
      .json({
        autolive: req.body.data,
      });
  });
};
