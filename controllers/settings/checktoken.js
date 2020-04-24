// middleware for routes: checks if the client has token-auth before passing on
const debug = require('debug')('checkToken');
const jwt = require('jsonwebtoken');

const { secret } = global.config;

module.exports = (req, res, next) => {
  debug('Entered middleware to check token-authorisation');
  // debug(req);
  const token = req.cookies.token
    || req.body.token
    || req.query.token
    || req.headers['x-access-token'];
  debug(token);
  if (!token) {
    debug('No token in client req');
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        debug('Matching token in client req');
        req.username = decoded.username;
        debug(req.username);
        res.status(200).send(`Welcome back ${req.username}`);
        // res.sendStatus(200);
      }
    });
  }
  next();
};
