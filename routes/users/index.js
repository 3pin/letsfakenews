'use strict';

/* declare a new router */
const routes = require('express').Router();

/* routes */
const landing = require('./main');
//const sse = require('./sse');
//const mode = require('./mode');
const add_title_story = require('./add_title_story');
const add_feedback = require('./add_feedback');
/* other routes */
//const databases = require('./databases');
//const displays = require('./displays');

/* this router */
routes.get('/', landing);
//routes.get('/sse', sse);
//routes.get('/mode', mode);
routes.post('/add_title_story', add_title_story);
routes.post('/add_feedback', add_feedback);

/* other routers
routes.use('/databases', databases);
routes.use('/displays', displays);
*/

module.exports = routes;
