// module debugging
// const debug = require('debug')('routes');

/* declare a new router */
const write = require('express').Router();
/* routes */
const addNews = require('../controllers/write/addNews');
const addFeedback = require('../controllers/write/addFeedback');
//= ============================================================================
// REACT connections: from Users
write.post('/news', addNews);
write.post('/feedback', addFeedback);

module.exports = write;
