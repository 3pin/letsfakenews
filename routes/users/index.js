'use strict';

/* declare a new router */
const routes = require('express').Router();

/* routes */
const add_title_story = require('./add_title_story');
const add_feedback = require('./add_feedback');

//=============================================================================
// REACT connections: from Landing
routes.get('/hello_from_react', (req, res) => {
  console.log('GET test from REACT received');
  res.send({ express: 'Hello From Express' });
});
// REACT connections: from Users
routes.post('/add_title_story', add_title_story);
routes.post('/add_feedback', add_feedback);
// REACT connections: from Admin
//
// REACT connections: from Display
//

module.exports = routes;
