'use strict'

const debug = require('debug')('authenticate')
const toBoolean = require('to-boolean')
const jwt = require('jsonwebtoken')
const Auth = require('../../models/auth.model')

module.exports = (req, res) => {
  debug('/settings/authenticate')
  // debug(req.body);
  const { username, password } = req.body
  Auth.findOne({ username }, function (err, user) {
    if (err) {
      res.status(500)
        .json({
          error: 'Internal error please try again'
        })
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username'
        })
    } else {
      debug(user)
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            })
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect password'
            })
        } else {
          debug('same', same)
          // Setup token
          const time = Number(process.env.TOKEN_AGE_MINS) * 60000
          const payload = { username }
          const secret = process.env.SECRET
          const token = jwt.sign(payload, secret, { expiresIn: time })
          // Setup Cookie
          const cookieOptions = { httpOnly: toBoolean(process.env.COOKIEOPTION_HTTPONLY), sameSite: toBoolean(process.env.COOKIEOPTION_SAMESITE), maxAge: time, secure: false, signed: false }
          debug(cookieOptions)
          res.cookie('token', token, cookieOptions).sendStatus(200)
        }
      })
    }
  })
}
