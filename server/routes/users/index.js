'use strict';

/* declare a new router */
const routes = require('express').Router();

/* routes */
const users = require('./main');
const add_title_story = require('./add_title_story');
const add_feedback = require('./add_feedback');

/* this router */
routes.get('/', users);
routes.post('/add_title_story', add_title_story);
routes.post('/add_feedback', add_feedback);
//
//=============================================================================
// API connections from React
routes.get('/hello_from_react', (req, res) => {
  console.log('GET test from REACT received');

  res.send({ express: 'Hello From Express' });
});
//
routes.post('/test/api/post', (req, res) => {
  console.log('POST test received');
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

module.exports = routes;
