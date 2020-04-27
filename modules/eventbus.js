const debug = require('debug')('eventbus');

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('uncaughtException', (err) => {
  debug(err);
});

module.exports = emitter;
