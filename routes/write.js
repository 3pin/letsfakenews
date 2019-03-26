'use strict';

// module debugging
const debug = require('debug')('routes_write');

/* declare a new router */
const write = require('express').Router();
/* routes */
const add_title_story = require('../controllers/write/add_title_story');
const add_feedback = require('../controllers/write/add_feedback');

//=============================================================================
// REACT connection
write.get('/write', (req, res) => {
  debug("'REACT /write' says 'Hello' ");
  res.send({ express: "Hello 'REACT /write' " });
});
// REACT connections: from Users
write.post('/write/news', add_title_story);
write.post('/write/feedback', add_feedback);
// REACT connections: from Admin
//
// REACT connections: from Display
//

module.exports = write;
