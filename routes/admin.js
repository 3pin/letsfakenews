
/* module debugging */
const debug = require('debug')('routes');

/* declare a new router */
const admin = require('express').Router();

/* routes */
const stories = require('../controllers/admin/stories/stories');
const storiesClear = require('../controllers/admin/stories/clear');
const storiesAutolive = require('../controllers/admin/stories/autolive');
const storiesRefresh = require('../controllers/admin/stories/refresh');
const storiesRemove = require('../controllers/admin/stories/remove');
const storiesStorylive = require('../controllers/admin/stories/storylive');
//
const feedback = require('../controllers/admin/feedback/feedback');
const feedbackClear = require('../controllers/admin/feedback/clear');
//
const visualise = require('../controllers/admin/visualise/visualise');
const visualiseNum = require('../controllers/admin/visualise/num');
const visualiseDuration = require('../controllers/admin/visualise/duration');
const visualiseScroller = require('../controllers/admin/visualise/scroller');
//
/* display stories database */
admin.get('/stories', stories);
// stories macro-ops
admin.get('/stories/autolive', storiesAutolive);
admin.get('/stories/refresh', storiesRefresh);
/* clear a database */
admin.delete('/stories/clear', storiesClear);
// stories row-ops
admin.delete('/stories/remove', storiesRemove);
admin.post('/stories/storylive', storiesStorylive);
//
/* display feedback database */
admin.get('/feedback', feedback);
/* clear a database */
admin.post('/feedback/clear', feedbackClear);
//
/* display visualise controls */
admin.get('/visualise', visualise);
admin.post('/visualise/num', visualiseNum);
admin.post('/visualise/duration', visualiseDuration);
admin.post('/visualise/scroller', visualiseScroller);

module.exports = admin;
