'use strict'

const debug = require('debug')('mode')

module.exports = (req, res) => {
  // serve mode-data to client
  debug('/GET routes/mode')
  // tap into an sse event-bus
  const bus = require('../../modules/eventbus')
  bus.emit('joined', 'Client visited the landing page')
  //
  res.send({
    dbSettings: req.dbSettings
  })
}
