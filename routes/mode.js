'use strict';

const debug = require('debug')('main_mode')

module.exports = (req, res) => {
  // serve mode-data to client
  debug('/GET mode msg')
  res.send(process.env.NODE_ENV);
}
