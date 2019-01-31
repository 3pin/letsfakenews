'use strict';

const debug = require('debug')('databases_autolive');

module.exports = (req, res) => {
  debug('autolive: ' + req.body.autolive);
  req.app.locals.autolive = req.body.autolive;
  debug('app.locals autolive: ' + req.app.locals.autolive);
  res.send('Autolive status set');
};
