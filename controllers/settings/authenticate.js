'use strict';

const debug = require('debug')('authenticate');

const jwt = require('jsonwebtoken');
const Auth = require('../../models/auth.model');

module.exports = (req, res) => {
  debug('/settings/authenticate');
  //debug(req.body);
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
          const secret = process.env.SECRET
          const token = jwt.sign(payload, secret);
          let domain;
          if (process.env.NODE_ENV === 'production') {
            domain = 'letsfakenews.herokuapp.com'
          } else {
            domain = 'localhost'
          }
          let tokenAge = Number(process.env.TOKEN_AGE_MINS) * 60000;
          //let tokenOptions = {signed:true, secure:true, domain:domain, maxAge:tokenAge, httpOnly:true, sameSite:false}
          let tokenOptions = {signed:false, secure:false, maxAge:tokenAge, httpOnly:true, sameSite:false}
          debug(tokenOptions);
          res.cookie('token', token, tokenOptions).sendStatus(200);
          //res.json({token:token});
          //res.status(200).send({ user, token: jwt.token });
        }
      });
    }
  });
};
