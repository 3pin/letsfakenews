'use strict';
const debug = require('debug')('index')
// tap into an sse event-bus
const bus = require('../modules/eventbus');

/* this router */
const routes = require('express').Router();
/* this router's routes */
const main = require('./main');
const mode = require('./mode');
const add_title_story = require('./add_title_story');
const add_feedback = require('./add_feedback');
/* other deeper routes */
const databases = require('./databases');
const displays = require('./displays');

/*
routes.get('/sse', function(req, res){
  res.set(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  Bus.on("message", function(event, data) {
    debug('SSE event to be relayed');
    res.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
  });
});
*/

routes.get('/sse', (req, res) => {
  debug('a client subscribed to /sse endpoint');
  req.setTimeout(0);
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  // send a startup message
  res.write(`event: startup\n`);
  res.write(`data: Server received your /sse request\n\n`);
  //res.write('retry: 28000\n');
  //
  // process 'test' messages
  bus.on('test', (data) => {
    debug('SSE msg to be emmitted from eventbus');
    res.write(`event: test\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.write('retry: 28000\n');
  });
  // process 'update' messages
  bus.on('update', (data) => {
    debug('SSE msg to be emmitted from eventbus');
    res.write(`event: update\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.write('retry: 28000\n');
    //res.end;
  });
  // send an eventbus test
  bus.emit("test", {
    msg: "Eventbus test emmitted"
  });

});
/*
setInterval(function() {
  bus.emit("update", "test", {
    msg: "Emmitting null-event to cancel 30sec server-timeout"
  });
}, 29000)
*/

/* this router's routes */
routes.get('/', main);
routes.get('/mode', mode);
/* this router's endpoints */
routes.post('/add_feedback', add_feedback);
routes.post('/add_title_story', add_title_story);

/* route in other routers */
routes.use('/databases', databases);
routes.use('/displays', displays);

module.exports = routes;
