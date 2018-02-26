// dev-module to load env constiables
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) {
  throw result.error
  //console.log(result.parsed)
}

// load in env constiables
const port = process.env.PORT
const uri = process.env.URI
const mode = process.env.MODE

const debug_startup = require('debug')('startup')
const debug_routes = require('debug')('routes')
const debug_database = require('debug')('database')

// modules
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// to connect to database
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/letsfakenews');

// routes
const index = require('./routes/index');

// initialize
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// condense the visible URL address in a client's browser
app.use(express.static(path.join(__dirname, 'public')));

var story_title
var story_text
/*
// POST /story_title data to database
app.post('/submit_title', function(req, res){
  debug_routes('/POST /submit_title request')
	const obj = {};
	debug_routes('body: ' + JSON.stringify(req.body));
  //res.send('You sent the tite "' + req.body.story_title + '".');
  //res.send('You sent the name "' + req.body.name + '".');
  //res.redirect('/02_story.html');
});
*/

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// define routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
