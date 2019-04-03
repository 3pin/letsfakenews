const debug = require('debug')('middleware');

// middleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const Settings = require('../../models/settings.model');

const withAuth = (req, res, next) => {
  debug("Entered middleware to check token-authorisation");
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = withAuth;
