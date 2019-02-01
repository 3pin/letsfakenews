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

/*
let infinity = Number.MAX_VALUE;
debug('infinity: ' + infinity);
*/

routes.get('/sse', (req, res) => {
  debug('someone subscribed to /sse route');
  req.setTimeout(0);
  bus.on('message', (data) => {
    debug('SSE message deteced on eventbus and will now be emmitted');
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.write('retry: 28000\n');
  });
});
/*
setInterval(function() {
  bus.emit("message", "test", {
    msg: "Emmitting test-event before 30sec server-timeout reached"
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
