const debug = require('debug')('controller');
const jwt = require('jsonwebtoken');
const Auth = require('../../models/auth.model');


module.exports = (req, res) => {
  debug('/settings/authenticate');
  const {
    username,
    password,
  } = req.body.data;
  debug(username, password);
  Auth.findOne({ username }).then((user) => {
    debug(user);
    if (!user) {
      debug('error: incorrect username');
      res.status(401)
        .json({
          message: 'WRONG_USERNAME',
        });
    } else {
      debug(user);
      user.isCorrectPassword(password, (error, same) => {
        if (error) {
          debug('error: Internal error please try again');
          res.status(500).json({
            message: 'DB_ERROR',
          });
        } else if (!same) {
          debug('error: Incorrect password');
          res.status(401)
            .json({
              message: 'WRONG_PASSWORD',
            });
        } else {
          debug('Correct password');
          // Setup token
          const time = Number(global.gConfig.tokenAgeMins) * 60000;
          const payload = {
            username,
          };
          const {
            secret,
          } = global.gConfig;
          const token = jwt.sign(payload, secret, {
            expiresIn: time,
          });
          // Setup Cookie
          const cookieOptions = {
            httpOnly: global.gConfig.cookieoptionHttponly,
            sameSite: global.gConfig.cookieoption_samesit,
            maxAge: time,
            secure: false,
            signed: false,
          };
          debug(cookieOptions);
          res.cookie('token', token, cookieOptions).sendStatus(200);
        }
      });
    }
  }).catch((err) => {
    debug('Err: ', err);
    res.status(500).json({
      message: 'DB_ERROR',
    });
  });
};
