'use strict';

const debug = require('debug')('sse');

// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  let open = true;
  // setup
  debug('a client subscribed to /sse endpoint');

  /* stop listening to SSE when the client closes frontend connection */
  /*
  req.on("close", () => {
    debug("SSE close msg recevied");
    if (!res.finished) {
      //res.set('Connection', "close");
      res.end();
      debug("Stopped sending events.");
      open = false;
    }
  });
  */

  res.set(200, {
    Connection: "keep-alive",
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  });

  //
  // send an 'admin' message
  bus.on('admin', (data) => {
    debug('SSE ADMIN-msg to be emmitted from eventbus');
    res.write(`event: admin\n`);
    res.write(`data: ${JSON.stringify(data)}`);
    res.write(`\n\n`);
  });

  // send a 'story' message
  bus.on('story', (data) => {
    debug('SSE STORY-msg to be emmitted from eventbus');
    res.write(`event: story\n`);
    res.write(`data: ${JSON.stringify(data)}`);
    res.write(`\n\n`);
    res.end();
  });

  // send an 'feedback' message
  bus.on('feedback', (data) => {
    //debug(data);
    debug('SSE FEEDBACK-msg to be emmitted from eventbus');
    res.write(`event: feedback\n`);
    res.write(`data: ${JSON.stringify(data)}`);
    res.write(`\n\n`);
  });
  // send an 'feedback' message
  bus.on('error', (err) => {
    //debug(data);
    debug('SSE error-msg', err);
  });

  //
  res.socket.on('end', e => {
    if (!res.finished) {
      debug('Socket event source closed', e);
      res.end();
    }
  });
}
