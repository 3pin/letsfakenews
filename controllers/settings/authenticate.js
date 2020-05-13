const debug = require('debug')('authenticate');
const jwt = require('jsonwebtoken');
const Auth = require('../../models/auth.model');

module.exports = (req, res) => {
  debug('/settings/authenticate');
  debug(req.body);
  const {
    username,
    password,
    room,
  } = req.body;
  Auth.findOne({
    room,
  }, (err, obj) => {
    if (err) {
      res.status(500)
        .json({
          error: 'Internal error please try again',
        });
    } else if (!obj) {
      res.status(401)
        .json({
          error: 'Incorrect username',
        });
    } else {
      debug(obj);
      obj.isCorrectPassword(password, (error, same) => {
        if (error) {
          debug('error');
          res.status(500)
            .json({
              error: 'Internal error, please try again',
            });
        } else if (!same) {
          debug('!same');
          res.status(401)
            .json({
              error: 'Incorrect password, please try again',
            });
        } else {
          debug('same');
          // Setup token
          const time = Number(global.config.tokenAgeMins) * 60000;
          const payload = {
            username,
          };
          const {
            secret,
          } = global.config;
          const token = jwt.sign(payload, secret, {
            expiresIn: time,
          });
          // Setup Cookie
          const cookieOptions = {
            httpOnly: global.config.cookieoptionHttponly,
            sameSite: global.config.cookieoption_samesit,
            maxAge: time,
            secure: false,
            signed: false,
          };
          debug(cookieOptions);
          res.cookie('token', token, cookieOptions).sendStatus(200);
        }
      });
    }
  });
};
