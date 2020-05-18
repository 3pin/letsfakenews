// middleware for routes: checks if the client has token-auth before passing on
const debug = require('debug')('controller');
const jwt = require('jsonwebtoken');

const {
  secret,
} = global.gConfig;

module.exports = (req, res, next) => {
  debug('Entered middleware to check token-authorisation');
  // debug(req);
  const token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];
  debug(`token: ${token}`);
  if (!token) {
    debug('No token in client-req');
    return res.status(401).json({
      message: 'Unauthorized: Please login first',
    });
  }
  debug('Token in client-req');
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      debug('Token error');
      return res.status(401).json({
        message: 'Unauthorized: Invalid login provided',
      });
    }
    debug('Token good')
    // req.username = decoded.username;
    return res.status(200).json({
      message: `Welcome back: ${decoded.username}`,
    });
  });
  return next;
};
