'use strict';
const debug = require('debug')('index')

/* this router */
const routes = require('express').Router();
/* this router's routes */
const main = require('./main');
const mode = require('./mode');
const add_title_story = require('./add_title_story');
const add_feedback = require('./add_feedback');
/* other deeper routes */
const databases = require('./databases');
const displays = require('./displays');

/* this router's routes */
routes.get('/', main);
routes.get('/mode', mode);
/* this router's endpoints */
routes.post('/add_title_story', add_title_story);
routes.post('/add_feedback', add_feedback);

/* route in other routers */
routes.use('/databases', databases);
routes.use('/displays', displays);

module.exports = routes;
