
const debug = require('debug')('controller');
const dbSettingsUpdate = require('../../middleware/dbSettingsUpdate');

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  const { room } = req.query;
  const { dbSettings } = req;
  debug(room, dbSettings);
  dbSettings.autolive = req.body.data;
  dbSettingsUpdate(dbSettings, room).then((doc) => {
    debug(doc);
    res.status(200)
      .json({
        autolive: req.body.data,
      });
  }).catch((err) => {
    debug('Err: ', err);
    res.status(500).json({
      message: 'DB_ERROR',
    });
  });
};
