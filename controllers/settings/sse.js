'use strict';

const debug = require('debug')('sse');

// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {

  /* stop listening to SSE when the client closes frontend connection */
  req.on("close", () => {
    debug("SSE req.close");
    /*
    if (!res.finished) {
      res.end();
      debug("Stopped sending events.");
    }
    */
  });
  //
  res.socket.on('end', () => {
    debug('SSE socket.close');
    /*
    if (!res.finished) {
      res.end();
      debug("Stopped sending events.");
    }
    */
  });

  // setup
  debug('a client subscribed to /sse endpoint');
  //req.setTimeout(0);
  res.writeHead(200, {
    Connection: "keep-alive",
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': '*',
    'Access-Control-Allow-Credentials': true
  });

  // send startup message
  /*
  res.write(`event: startup\n`);
  res.write(`data: Server received your /sse request\n\n`);
  */

  /*
    // send a repeating dummy event to keep the connection from timing-out
      setInterval(function () {
        res.write(`event: keepalive\n`);
        res.write(`: SSE keep-alive dummy-comment\n\n`);
        debug('Emmitted an SSE keep-alive event');
      }, process.env.KEEPALIVE);
    */

  //
  // send an 'admin' message
  bus.on('admin', (data) => {
    debug('SSE msg to be emmitted from eventbus');
    res.write(`event: admin\n`);
    res.write(`data: ${JSON.stringify(data)}`);
    res.write(`\n\n`);
  });
  // send a 'story' message
  bus.on('story', (data) => {
    debug(data);
    debug('SSE story-msg to be emmitted from eventbus');
    res.write(`event: story\n`);
    res.write(`data: ${JSON.stringify(data)}`);
    res.write(`\n\n`);
  });
  // send an 'feedback' message
  bus.on('feedback', (data) => {
    //debug(data);
    debug('SSE feedback-msg to be emmitted from eventbus');
    res.write(`event: feedback\n`);
    res.write(`data: ${JSON.stringify(data)}`);
    res.write(`\n\n`);
  });
  // send an 'feedback' message
  bus.on('error', (err) => {
    //debug(data);
    debug('SSE bus err', err);
  });
}
