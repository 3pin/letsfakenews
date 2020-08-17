const debug = require('debug')('activelist');
const Settings = require('../../models/settings.model');

module.exports = (req, res) => {
  debug('/GET /settings/activelist');
  Settings.find({}).then((result) => {
    debug(result.activelist);
    res.send({
      response: result.activelist,
    });
  }).catch((err) => {
    debug('Err: ', err);
    res.status(500).json({
      message: 'DB_ERROR',
    });
  });
};
