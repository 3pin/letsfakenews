
const debug = require('debug')('sse');

// tap into an sse event-bus
const bus = require('../../modules/eventbus');

module.exports = (req, res) => {
  debug('SSE activity');
  /* setup */
  res.set({
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });
  /* send startup message */
  res.write('event: joined\n');
  res.write('data: Server received your /sse request');
  res.write('\n\n');
  /* send a repeating dummy event to keep the connection from timing-out */
  setInterval(() => {
    if (!res.finished) {
      res.write('event: keepAlive\n');
      res.write(': SSE keep-alive dummy-comment\n\n');
      debug('Emmitted an SSE keep-alive event');
    }
  }, global.config.keepAlive);
  /* stop listening to SSE when the client closes frontend connection */
  req.on('close', () => {
    debug('SSE req.close');
    if (!res.finished) {
      res.end();
      debug('Stopped sending events.');
    }
  });
  /* send a 'dummy' message... which is being done above */
  bus.on('keepAlive', (data) => {
    if (!res.finished) {
      debug('SSE keepAlive-msg to be emmitted from eventbus');
      res.write('event: keepAlive\n');
      res.write(`data: ${JSON.stringify(data)}`);
      res.write('\n\n');
    }
  });
  /* send an 'admin' message */
  bus.on('joined', (data) => {
    if (!res.finished) {
      debug('SSE joined-msg to be emmitted from eventbus');
      res.write('event: joined\n');
      res.write(`data: ${JSON.stringify(data)}`);
      res.write('\n\n');
    }
  });
  /* send an 'admin' message */
  bus.on('admin', (data) => {
    if (!res.finished) {
      debug('SSE admin-msg to be emmitted from eventbus');
      res.write('event: admin\n');
      res.write(`data: ${JSON.stringify(data)}`);
      res.write('\n\n');
    }
  });
  /* 'story' message to update admin page */
  bus.on('story', (data) => {
    if (!res.finished) {
      // debug(data);
      debug('SSE story-msg to be emmitted from eventbus');
      res.write('event: story\n');
      res.write(`data: ${JSON.stringify(data)}`);
      res.write('\n\n');
    }
  });
  /* 'activelistChange' message to update visualise pages */
  bus.on('activelistChange', (data) => {
    if (!res.finished) {
      debug(data);
      debug('SSE activelistChange-msg to be emmitted from eventbus');
      res.write('event: activelistChange\n');
      res.write(`data: ${JSON.stringify(data)}`);
      res.write('\n\n');
    }
  });
  /* 'feedback' message to update admin page */
  bus.on('feedback', (data) => {
    if (!res.finished) {
      // debug(data);
      debug('SSE feedback-msg to be emmitted from eventbus');
      res.write('event: feedback\n');
      res.write(`data: ${JSON.stringify(data)}`);
      res.write('\n\n');
    }
  });
  /* error message */
  bus.on('error', (err) => {
    // debug(data);
    debug('SSE bus err', err);
  });
};
