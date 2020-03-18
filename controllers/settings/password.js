
const debug = require('debug')('password');
const Auth = require('../../models/auth.model');

module.exports = (req, res) => {
  debug('/GET /settings/password');
  Auth.find({}).then((result) => {
    debug(result.password);
    res.send({
      password: result.password,
    });
  });
};
