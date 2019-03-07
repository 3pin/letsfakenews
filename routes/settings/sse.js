'use strict';

const debug = require('debug')('routes_settings');

// tap into an sse event-bus
const bus = require('../../modules/eventbus');

/*
// setup a dummy admin-event to keep the connection from timing-out
setInterval(function() {
  bus.emit("admin", {
    msg: "Null-event emmitted to keep connection alive"
  });
  debug('emmitted an SSE keep-alive message');
}, 2000);
*/

module.exports = (req, res) => {
  // setup
  debug('a client subscribed to /sse endpoint');
  req.setTimeout(0);
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });
  // send a startup & keepalive message
  res.write(`event: startup\n`);
  res.write(`data: Server received your /sse request\n\n`);
  // a dummy event to keep the connection from timing-out
  setInterval(function() {
    res.write(`: SSE keep-alive dummy-comment\n`);
    debug('Emmitted an SSE keep-alive comment');
  }, process.env.KEEPALIVE);
  //
  // send an 'admin' message
  bus.on('admin', (data) => {
    debug('SSE msg to be emmitted from eventbus');
    res.write(`event: admin\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
  // send a 'story' message
  bus.on('story', (data) => {
    debug(data);
    debug('SSE story-msg to be emmitted from eventbus');
    res.write(`event: story\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
  // send an 'feedback' message
  bus.on('feedback', (data) => {
    debug(data);
    debug('SSE feedback-msg to be emmitted from eventbus');
    res.write(`event: feedback\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}
