'use strict';

const debug = require('debug')('main_mode')

module.exports = (req, res) => {
  // serve mode-data to client
  debug('/GET routes/mode');
  let mode = process.env.NODE_ENV;
  let autolive = req.app.locals.autolive;
  res.send({
    mode: mode,
    autolive: autolive
  });
}
