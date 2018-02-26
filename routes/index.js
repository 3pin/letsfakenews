const express = require('express');
const router = express.Router();

const NLP_parser_module = require('../modules/NLP_parser_module_v02.js');
const image_search_module = require('../modules/image_search_module_v02.js')

let debug_get = require('debug')('get');
let debug_post = require('debug')('post');
let debug_parse = require('debug')('parse');
let debug_search = require('debug')('search');
let debug_save = require('debug')('save');

// serve homepage index /GET
router.get('/', (req, res, next) => {
  debug_get('/GET msg to index page')
  res.render('index', {
    title: 'Welcome... '
  });
  //res.send(process.env.MODE);
});

// receive test /POST.
router.post('/post_test', (req, res, next) => {
  debug_post('recvd msg /post_test')
});

// receive title-story /POST
router.post('/add_title_story', function(req, res) {
  //variables to be set
  var title;
  var story;
  var image_search_result = [];
  // Get our form values. These rely on the "name" attributes
  title = req.body.title;
  story = req.body.story;
  debug_post('Title: ' + title + '\n' + 'Story: ' + story);
  // parse: STORY downto NOUNS
  var parsed_sentence_array = NLP_parser_module.NLP_parse_words(story)
  for (let pos of parsed_sentence_array) {
    debug_parse('pos: ' + pos)
  }
  // search: a URL foreach NOUN
  for (let value of parsed_sentence_array) {
    //console.log('parsed_sentence nouns: ' + value)
    image_search_result.push(image_search_module.google_image_search(value))
  };
  for (let result of image_search_result) {
    debug_search('image_search_result now: ' + result)
  }
  // // //
  // on calllback from above, the retruned URLS trigger save-to-database
  // // //
  // save: to database - start by setting our internal DB variable
  var db = req.db;
  // Set our collection
  var collection = db.get('usercollection');
  // Submit to the DB
  collection.insert({
    "title": title,
    "story": story
    //"results": how to save the array of tersm:URLS into the database???
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
