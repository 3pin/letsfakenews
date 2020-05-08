
// module debugging
// const debug = require('debug')('routes_write');

/* declare a new router */
const write = require('express').Router();
/* routes */
const addNews = require('../controllers/write/addNews');
const addFeedback = require('../controllers/write/addFeedback');
//= ============================================================================
// REACT connections: from Users
write.post('/write/news', addNews);
write.post('/write/feedback', addFeedback);

module.exports = write;
