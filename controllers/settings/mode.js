
const debug = require('debug')('mode');
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  // serve mode-data to client
  debug('/GET routes/mode');
  // tap into an sse event-bus
  bus.emit('joined', 'Client visited the landing page');
  //
  res.send({
    dbSettings: req.dbSettings,
  });
};
