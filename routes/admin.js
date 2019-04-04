'use strict';

/* module debugging */
const debug = require('debug')('routes_admin');

/* declare a new router */
const admin = require('express').Router();
/* load middleware */
const withAuth = require('../controllers/middleware/withAuth');

/* routes */
const feedback = require('../controllers/admin/feedback');
const clear = require('../controllers/admin/clear');
const stories = require('../controllers/admin/stories');
const autolive = require('../controllers/admin/autolive');
const refresh = require('../controllers/admin/refresh');
const remove = require('../controllers/admin/remove');
const storylive = require('../controllers/admin/storylive');
//
// admin landing
admin.get('/', (req, res) => {
  debug("'REACT /admin' says 'Hello' ");
  res.send({express: "Hello 'REACT... route admin' "});
});

/* display feedback database */
admin.get('/feedback', withAuth, feedback);
/* display stories database */
admin.get('/stories', withAuth, stories);
/* clear a database */
admin.post('/clear', clear);
// stories macro-ops
admin.get('/stories/autolive', autolive);
admin.get('/stories/refresh', refresh);
// stories row-ops
admin.post('/story/remove', remove);
admin.post('/story/storylive', storylive);

module.exports = admin;
