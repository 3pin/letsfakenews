'use strict';

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

const auth = require("http-auth");
const digest = auth.digest({
  realm: "Private area",
  file: "./htpasswd",
  authType: "digest"
});

function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
}

/* this router */
// REACT connections: from Landing
admin.get('/', (req, res) => {
  console.log('Hello from REACT /admin received');
  res.send({ express: 'Hello /admin' });
});

admin.get('/admin/stories', middleware_auth, main);

admin.get('/feedback', feedback);
admin.delete('/clear', clear);
admin.delete('/feedback_clear', feedback_clear);
admin.delete('/remove', remove);
admin.put('/autolive', autolive);
admin.put('/storylive', storylive);
admin.put('/refresh', refresh);

module.exports = admin;
