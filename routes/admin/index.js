'use strict';

/* module debugging */
const debug = require('debug')('routes_admin');

/* declare a new router */
const admin = require('express').Router();

/* routes */
const feedback = require('./feedback');
const feedback_clear = require('./clear_feedback');
//
const stories = require('./stories');
const autolive_request = require('./autolive_request');
const autolive_set = require('./autolive_set');
const refresh = require('./refresh');
const stories_clear = require('./clear_stories');
const remove = require('./remove');
const storylive = require('./storylive');
//
// admin landing
admin.get('/', (req, res) => {
  debug("'REACT /admin' says 'Hello' ");
  res.send({express: "Hello 'REACT /admin' "});
});

// admin feedback-db
admin.get('/feedback', (req, res, next) => {
  debug("'REACT /admin/feedback' says 'Hello' ");
  next();
}, feedback);
admin.get('/feedback/clear', feedback_clear);

// admin stories-db
admin.get('/stories', (req, res, next) => {
  debug("'REACT /admin/stories' says 'Hello' ");
  next();
}, stories);
admin.get('/stories/autolive_request', autolive_request);
admin.post('/stories/autolive_set', autolive_set);
admin.get('/stories/refresh', refresh);
admin.get('/stories/clear', stories_clear);
admin.post('/story/storylive', storylive);
//admin.post('/story/remove', remove);

module.exports = admin;
