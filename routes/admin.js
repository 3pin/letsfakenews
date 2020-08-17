/* module debugging */
// const debug = require('debug')('routes');

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
/* stories: display all */
admin.get('/stories', stories);
/* stories: autolive */
admin.put('/stories/autolive', storiesAutolive);
/* stories: refresh */
admin.get('/stories/refresh', storiesRefresh);
/* stories: delete all */
admin.delete('/stories/clear', storiesClear);
/* story: delete */
admin.delete('/stories/remove', storiesRemove);
/* storye: storylive */
admin.put('/stories/storylive', storiesStorylive);
//
/* feedback: display all */
admin.get('/feedback', feedback);
/* feedback: delete all */
admin.delete('/feedback/clear', feedbackClear);
//
/* display visualise controls */
admin.get('/visualise', visualise);
admin.put('/visualise/num', visualiseNum);
admin.put('/visualise/duration', visualiseDuration);
admin.put('/visualise/scroller', visualiseScroller);

module.exports = admin;
