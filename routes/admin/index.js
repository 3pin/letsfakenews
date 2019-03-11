'use strict';

/* module debugging */
const debug = require('debug')('routes_admin');

/* declare a new router */
const admin = require('express').Router();

/* routes */
const feedback = require('./feedback');
const clear = require('./clear');
const stories = require('./stories');
const autolive = require('./autolive');
const refresh = require('./refresh');
const remove = require('./remove');
const storylive = require('./storylive');
//
// admin landing
admin.get('/', (req, res) => {
  debug("'REACT /admin' says 'Hello' ");
  res.send({express: "Hello 'REACT /admin' "});
});

/* display feedback database */
admin.get('/feedback', feedback);
/* display stories database */
admin.get('/stories', stories);
/* clear a database */
admin.post('/clear', clear);
// stories macro-ops
admin.get('/stories/autolive', autolive);
admin.get('/stories/refresh', refresh);
// stories row-ops
admin.post('/story/remove', remove);
admin.post('/story/storylive', storylive);

module.exports = admin;
