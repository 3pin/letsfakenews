'use strict';

const debug = require('debug')('sse');
// tap into an sse event-bus
const bus = require('../modules/eventbus');

/*
// setup a dummy event to keep the connection from timing-out
setInterval(function() {
  bus.emit("keep_alive", {
    msg: "Null-event emmitted to keep connection alive"
  });
  debug('emmitted a keep-alive message to the clients subscribed to SSE');
}, 2000)
*/

module.exports = (req, res) => {
  // setup
  debug('a client subscribed to /sse endpoint');
  req.setTimeout(0);
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });
  // send a startup message
  res.write(`event: startup\n`);
  //res.write(`: start of the SSE startup msg\n`);
  res.write(`data: Server received your /sse request\n\n`);
  //res.write(`: end of the SSE startup msg\n`);
  //res.write('retry: 28000\n');
  //
  // send a 'keep_alive' message
  bus.on('keep_alive', (data) => {
    debug('SSE msg to be emmitted from eventbus');
    res.write(`: start of SSE keep_alive msg\n`);
    //res.write(`event: keep_alive\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    //res.write(`: end of SSE keep_alive msg\n`);
  });
  // send an 'update' message
  bus.on('update', (data) => {
    debug('SSE msg to be emmitted from eventbus');
    res.write(`event: update\n`);
    //res.write(`: start of SSE update msg\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    //res.write(`: end of SSE update msg\n`);
  });
}
