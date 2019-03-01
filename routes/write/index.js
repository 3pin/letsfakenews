'use strict';

/* declare a new router */
const write = require('express').Router();
/* routes */
const add_title_story = require('./add_title_story');
const add_feedback = require('./add_feedback');

//=============================================================================
// REACT connections: from Landing
write.get('/write', (req, res) => {
  console.log('Hello from REACT /write received');
  res.send({ express: 'Hello /write' });
});
// REACT connections: from Users
write.post('/write/news', add_title_story);
write.post('/write/feedback', add_feedback);
// REACT connections: from Admin
//
// REACT connections: from Display
//

module.exports = write;
