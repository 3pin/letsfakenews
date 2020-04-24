const debug = require('debug')('authenticate');
const jwt = require('jsonwebtoken');
const Auth = require('../../models/auth.model');

module.exports = (req, res) => {
  debug('/settings/authenticate');
  // debug(req.body);
  const {
    username,
    password,
  } = req.body;
  Auth.findOne({
    username,
  }, (err, user) => {
    if (err) {
      res.status(500)
        .json({
          error: 'Internal error please try again',
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username',
        });
    } else {
      debug(user);
      user.isCorrectPassword(password, (error, same) => {
        if (error) {
          res.status(500)
            .json({
              error: 'Internal error please try again',
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect password',
            });
        } else {
          debug('same', same);
          // Setup token
          const time = Number(global.config.token_age_mins) * 60000;
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
            httpOnly: global.config.cookieoption_httponly,
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
