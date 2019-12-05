'use strict';

// module debugging
const debug = require('debug')('routes_watch');

/* declare a new router */
const watch = require('express').Router();

/* routes */
const request_new_story = require('../controllers/watch/request_new_story');
const visualise = require('../controllers/watch/visualise');

// REACT connection
watch.get('/', (req, res) => {
  debug("'REACT /watch' says 'Hello' ");
  res.send({ express: "Hello 'REACT... route-watch' " });
});
watch.get('/request_new_story', request_new_story);
watch.get('/visualise', visualise);

module.exports = watch;
