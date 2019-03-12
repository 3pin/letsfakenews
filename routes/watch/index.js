'use strict';

// module debugging
const debug = require('debug')('routes_watch');

/* declare a new router */
const watch = require('express').Router();

/* routes */
const display = require('./display');
const request_new_story = require('./request_new_story');

// REACT connection
watch.get('/', (req, res) => {
  debug("'REACT /watch' says 'Hello' ");
  res.send({ express: "Hello 'REACT /watch' " });
});
watch.get('/display', display);
watch.get('/request_new_story', request_new_story);

module.exports = watch;
