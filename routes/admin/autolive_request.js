'use strict';

const debug = require('debug')('routes_admin');

module.exports = (req, res) => {
  debug('requesting autolive status... ');
  res.send({autolive: req.app.locals.autolive});
};
