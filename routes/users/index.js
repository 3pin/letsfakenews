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

module.exports = routes;
