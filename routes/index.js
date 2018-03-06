const express = require('express');
const router = express.Router();

var NLP_parser_module = require('../modules/NLP_parser_module_v02.js');
//var image_search_module = require('../modules/image_search_module_v02.js')

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
  //
  //variables to be set and later saved to a
  var title;
  var story;
  var parsed_sentence_array;
  var urls = [];
  //
  // Get our form values. These rely on the "name" attributes
  title = req.body.title;
  story = req.body.story;
  debug_post('Title: ' + title + '\n' + 'Story: ' + story);
  //
  // parse: STORY downto NOUNS... save to an array
  parsed_sentence_array = NLP_parser_module.NLP_parse_words(story)
  for (let pos of parsed_sentence_array) {
    debug_parse('pos: ' + pos)
  }
  //
  // search: fetch a URL for each NOUN
  var async = require('async');
  var operation = function(input_text, doneCallback) {
    var searchterm = input_text
    var searchterm_url_result
    const GoogleImages = require('google-images');
    var custom_search_engine_ID = process.env.CUSTOM_SEARCH_ENGINE_ID;
    var APIkey = process.env.CUSTOM_SEARCH_APIKEY;
    const client = new GoogleImages(custom_search_engine_ID, APIkey);
    var searchSettings = {
      searchType: 'image',
      size: 'xlarge',
      safe: 'high',
      imgColorType: 'color'
    }
    client.search(searchterm, searchSettings).then(
      function(image_search_results) {
        var urlArray = []
        //console.log(print_results)
        for (let value of image_search_results) {
          var item = value;
          if (item.url) {
            urlArray.push(item.url)
          }
        }
        searchterm_url_result = searchterm + ': ' + urlArray[0]
        debug_search(searchterm_url_result)      // print the URL of the first image returned via image-search
        return doneCallback(null, urlArray[0]);   // pass through full results
      })
  }
  async.map(parsed_sentence_array, operation, function(err, results) {
    urls = results
    for (i = 0; i < urls.length; i++) {
      debug_save('Word:' + parsed_sentence_array[i] + ' - Url:' + urls[i])
    }
    //
    // save to database - start by setting our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.insert({
      "title": title,
      "story": story,
      "content": [ parsed_sentence_array, urls ]
      //"results": how to save the array of tersm:URLS into the database???
    }, function(err, doc) {
      if (err) {
        // If it failed, return error
        res.send("There was a problem adding to the database.");
      } else {
        // If it saved
        res.send("Saved to the database.");
        // And forward to success page
        //res.render('index', {title: 'Lets Fake News'});
      }
    });
  });
});

module.exports = router;
