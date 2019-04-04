'use strict';

const debug = require('debug')('routes_auth');

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const Auth = require('../../models/auth.model');

module.exports = (req, res) => {
  debug('/settings/authenticate');
  debug(req.body);
  const { username, password } = req.body;
  Auth.findOne({ username }, function(err, user) {
    if (err) {
      console.error('Error Boom', err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username or password'
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
              error: 'Incorrect username or password'
          });
        } else {
          debug('same', same);
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
};