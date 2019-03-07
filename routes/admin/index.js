'use strict';

/* module debugging */
const debug = require('debug')('routes_admin');

/* declare a new router */
const admin = require('express').Router();

/* routes */
const main = require('./main');
const feedback = require('./feedback');
const clear = require('./clear');
const feedback_clear = require('./feedback_clear');
const remove = require('./remove');
const autolive = require('./autolive');
const storylive = require('./storylive');
const refresh = require('./refresh');

// REACT connections
admin.get('/', (req, res) => {
  debug("'REACT /admin' says 'Hello' ");
  res.send({express: "Hello 'REACT /admin' "});
});
/*
admin.get('/feedback', (req, res) => {
  debug("'REACT /admin/feedback' says 'Hello' ");
  res.send({express: "Hello 'REACT /admin/feedback' "});
});
*/
admin.get('/feedback', (req, res, next) => {
  debug("'REACT /admin/feedback' says 'Hello' ");
  next();
}, feedback);
admin.get('/feedback/clear', feedback_clear);

admin.get('/admin/stories', main);
admin.delete('/clear', clear);
//admin.delete('/feedback_clear', feedback_clear);
admin.delete('/remove', remove);
admin.put('/autolive', autolive);
admin.put('/storylive', storylive);
admin.put('/refresh', refresh);

module.exports = admin;
