// const debug = require('debug')('routes');

/* declare a new router */
const settings = require('express').Router();

/* settings */
const sse = require('../controllers/settings/sse');
const mode = require('../controllers/settings/mode');
const activelist = require('../controllers/settings/activelist');
const checkToken = require('../controllers/settings/checktoken');
const authenticate = require('../controllers/settings/authenticate');
const checkDevice = require('../controllers/settings/checkdevice');
const room = require('../controllers/settings/room');

/* check if room valid */
settings.get('/room', room);
/* sub to SSE */
settings.get('/sse', sse);
/* fetch mode from db */
settings.get('/mode', mode);
/* fetch activelist from db */
settings.get('/activelist', activelist);
/* fetch password from db */
// settings.get('/password', password);
/* check if the user has an authToken... if not ask them to login */
settings.get('/checkToken', checkToken);
/* authenticate login:username/password against db */
settings.post('/authenticate', authenticate);
/* check device Type ... desktop or mobile? */
settings.get('/checkDevice', checkDevice);

module.exports = settings;
