'use strict';

const debug = require('debug')('routes_settings');
const Auth = require('../../models/auth.model');

module.exports = (req, res) => {
  debug('/GET /settings/activelist');
  Auth.find({}).then((res) => {
    debug(res.password);
    res.send({
      password: res.password
    });
  });
};
