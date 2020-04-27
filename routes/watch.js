
// module debugging
const debug = require('debug')('routes_watch');

/* declare a new router */
const watch = require('express').Router();

/* routes */
const requestNewStory = require('../controllers/watch/requestNewStory');
const visualise = require('../controllers/watch/visualiseCalcFrontend');

// REACT connection
watch.get('/', (req, res) => {
  debug("'REACT /watch' says 'Hello' ");
  res.send({ express: "Hello 'REACT... route-watch' " });
});
watch.get('/requestNewStory', requestNewStory);
watch.get('/visualise', visualise);

module.exports = watch;
