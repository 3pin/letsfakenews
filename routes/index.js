var express = require('express');
var router = express.Router();

const debug_post_data = require('debug')('post_data')

// GET home page.
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Welcome... '
  });
});

// GET submit_title page.
router.get('/gototitle', (req, res, next) => {
  console.log('recvd msg /gototitle')
  res.render('title', {
    title: 'Story... '
  });
});

// GET Userlist page.
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist": docs
    });
  });
});

// GET NewUser page.
router.get('/newuser', function(req, res) {
  res.render('newuser', {
    title: 'Add New User'
  });
});

// Gather test /POST.
router.post('/post_test', (req, res, next) => {
  debug_post_data('recvd msg /post_test')
});

// Gather title-story /POST
router.post('/add_title_story', function(req, res) {
  // Set our internal DB variable
  var db = req.db;
  // Get our form values. These rely on the "name" attributes
  var title = req.body.title;
  var story = req.body.story;
  debug_post_data('title: ' + title + '... story: ' + story)
  //
  // parse: STORY for NOUNS
  //
  // search: for URL per NOUNS
  //
  // save: to database
  // Set our collection
  var collection = db.get('usercollection');
  // Submit to the DB
  collection.insert({
    "title": title,
    "story": story
  }, function(err, doc) {
    if (err) {
      // If it failed, return error
      //res.send("There was a problem adding to the database.");
    } else {
      // If it saved
      //res.send("Saved to the database.");
      // And forward to success page
      //res.render('index', {title: 'Lets Fake News'});

    }
  });
});

module.exports = router;
