// module debugging
// const debug = require('debug')('routes');

/* declare a new router */
const watch = require('express').Router();

/* routes */
const requestNewStory = require('../controllers/watch/requestNewStory');
const visualise = require('../controllers/watch/visualiseCalcFrontend');

// REACT connection
watch.get('/requestNewStory', requestNewStory);
watch.get('/visualise', visualise);

module.exports = watch;
