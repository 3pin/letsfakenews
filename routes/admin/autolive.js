'use strict';

const debug = require('debug')('routes_admin');

module.exports = (req, res) => {
  /* update an entries display-checkbox */
  debug('About to switch autolive status... ');
  debug('Autolive status currently set to: ' + req.app.locals.autolive);
  debug(req.app.locals.autolive);
  if (req.app.locals.autolive === true) {
    debug('Setting to FALSE');
    req.app.locals.autolive = false;
    res.json({
      autolive: false
    });
  } else {
    debug('Setting to TRUE');
    req.app.locals.autolive = true;
    res.json({
      autolive: true
    });
  }
}
