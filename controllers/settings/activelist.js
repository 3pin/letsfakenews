'use strict';

const debug = require('debug')('routes_settings');
const Settings = require('../../models/settings.model');

module.exports = (req, res) => {
  debug('/GET /settings/activelist');
  Settings.find({}).then((res) => {
    debug(res.activelist);
    res.send({
      response: res.activelist
    });
  });
};
