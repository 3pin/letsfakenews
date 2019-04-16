//middleware for routes: checks if the client has token-auth before passing on
const debug = require('debug')('checkToken');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const Settings = require('../../models/settings.model');

module.exports = (req, res) => {
  debug("Entered middleware to check token-authorisation");
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  debug(token);
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.username = decoded.username;
        debug(req.username);
        debug('Ran withAuth middleware token-check');
        res.sendStatus(200);
        //next();
      }
    });
  }
}
