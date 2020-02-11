'use strict';

/* module debugging */
const debug = require('debug')('routes_admin');

/* declare a new router */
const admin = require('express').Router();

/* routes */
const stories = require('../controllers/admin/stories/stories');
const stories_clear = require('../controllers/admin/stories/clear');
const stories_autolive = require('../controllers/admin/stories/autolive');
const stories_refresh = require('../controllers/admin/stories/refresh');
const stories_remove = require('../controllers/admin/stories/remove');
const stories_storylive = require('../controllers/admin/stories/storylive');
//
const feedback = require('../controllers/admin/feedback/feedback');
const feedback_clear = require('../controllers/admin/feedback/clear');
//
const visualise = require('../controllers/admin/visualise/visualise');
const visualise_num = require('../controllers/admin/visualise/num');
const visualise_duration = require('../controllers/admin/visualise/duration');
const visualise_scroller = require('../controllers/admin/visualise/scroller');
//
// admin landing
admin.get('/', (req, res) => {
  debug("'REACT /admin' says 'Hello' ");
  res.send({express: "Hello 'REACT... route admin' "});
});
//
/* display stories database */
admin.get('/stories/', stories);
// stories macro-ops
admin.get('/stories/autolive', stories_autolive);
admin.get('/stories/refresh', stories_refresh);
/* clear a database */
admin.post('/stories/clear', stories_clear);
// stories row-ops
admin.post('/stories/remove', stories_remove);
admin.post('/stories/storylive', stories_storylive);
//
/* display feedback database */
admin.get('/feedback', feedback);
/* clear a database */
admin.post('/feedback/clear', feedback_clear);
//
/* display visualise controls */
admin.get('/visualise', visualise);
admin.post('/visualise/num', visualise_num);
admin.post('/visualise/duration', visualise_duration);
admin.post('/visualise/scroller', visualise_scroller);

module.exports = admin;
