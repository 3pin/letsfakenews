'use strict';

// module debugging
const debug = require('debug')('routes_watch');

/* declare a new router */
const watch = require('express').Router();

/* middleware */
const deviceType = require('../controllers/middleware/deviceType');

/* routes */
const request_new_story = require('../controllers/watch/request_new_story');

// REACT connection
watch.get('/', (req, res) => {
  debug("'REACT /watch' says 'Hello' ");
  res.send({ express: "Hello 'REACT... route-watch' " });
});
watch.get('/request_new_story', deviceType, request_new_story);

module.exports = watch;
