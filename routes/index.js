/* module debugging */
// const debug = require('debug')('room');

/* declare a new router */
const routes = require('express').Router();

/* routes */
const write = require('./write');
const watch = require('./watch');
const admin = require('./admin');
const settings = require('./settings');

routes.use('/write', write);
routes.use('/watch', watch);
routes.use('/admin', admin);
routes.use('/settings', settings);

module.exports = routes;
