'use strict';

const debug = require('debug')('authenticate');

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const Auth = require('../../models/auth.model');

module.exports = (req, res) => {
  debug('/settings/authenticate');
  debug(req.body);
  const { username, password } = req.body;
  Auth.findOne({ username }, function(err, user) {
    if (err) {
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username'
        });
    } else {
      debug(user);
      let auth = new Auth();
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect password'
          });
        } else {
          debug('same', same);
          // Issue token
          const payload = { username };
          debug('payload', payload);
          const token = jwt.sign(payload, secret, {expiresIn: '1h'});
          debug('token', token);
          let tokenAge = parseInt(process.env.TOKEN_AGE_MINS) * 60000;
          debug(tokenAge);
          //let tokenOptions = JSON.parse(process.env.TOKEN_OPTIONS);
          let tokenOptions = {httpOnly:true, sameSite:false, maxAge:tokenAge}
          res.cookie('token', token, tokenOptions)
            .sendStatus(200);
        }
      });
    }
  });
};
