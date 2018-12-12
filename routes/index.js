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
routes.post('/add_title_story', add_title_story);
routes.post('/add_feedback', add_feedback);
/* other deeper routes */
routes.use('/databases', databases);
routes.use('/displays', displays);
/* view the db
routes.get('/database', (req, res) => {
  debug(process.env.COLLECTION)
  let collection = req.db.get(process.env.COLLECTION);
  collection.find({}, {}, function(e, docs) {
    res.render('database', {
      tabtitle: "LetsFakeNews:database",
      stories: docs
    });
  });
});
*/

module.exports = routes;
