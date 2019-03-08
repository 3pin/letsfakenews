'use strict';

const debug = require('debug')('routes_admin');

module.exports = (req, res) => {
  debug('posting autolive status... ');
  req.app.locals.autolive = req.body.autolive;
  //res.send('test');
  //res.send({autolive: 'test'});
  res.send({autolive: req.app.locals.autolive});
};
