'use strict';

/* declare a new router */
const routes = require('express').Router();

/* routes */
const write = require('./write/index');
const watch = require('./watch/index');
const admin = require('./admin/index');

//=============================================================================
// REACT connections: from Landing
roues.use('/write', write);
roues.use('/watch', watch);
roues.use('/admin', admin);

/*
routes.get('/write', (req, res) => {
  console.log('GET test from REACT received');
  res.send({ express: 'Hello /write' });
});
// REACT connections: from Users
routes.post('/add_title_story', add_title_story);
routes.post('/add_feedback', add_feedback);
*/

module.exports = routes;
