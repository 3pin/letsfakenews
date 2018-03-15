let debug_get = require('debug')('get');
let debug_post = require('debug')('post');
let debug_parse = require('debug')('parse');
let debug_search = require('debug')('search');
let debug_save = require('debug')('save');
let debug_db = require('debug')('db');

const express = require('express');
const router = express.Router();
const pos = require('pos');

// load middle-ware modules
var NLP_parser_module = require('../modules/NLP_parser_module.js');
//var image_search_module = require('../modules/image_search_module.js')
var time_ops = require('../modules/time_ops.js');
var expletives = ["poo", "poop", "piss", "shit", "willy", "willies", "dick", "dicks", "asshole", "assholes", "arsehole", "arseholes", "vagina", "vaginas", "boob", "boobs", "pussy", "pussys", "cunt", "cunts", "fuck", "shag"]

// serve homepage / index
router.get('/', (req, res, next) => {
  debug_get('/GET msg to index page')
  res.render('index', {
    tabtitle: "LetsFakeNews"
  });
  //res.send(process.env.MODE);
});

// receive title-story info from homepage
router.post('/add_title_story', function(req, res) {
  //
  //variables to be set and later saved to a
  var title;
  var story;
  var parsed_sentence_array;
  var urls = [];
  //
  // Get our form values. These rely on the "name" attributes
  title = req.body.title.toUpperCase();
  story = req.body.story;
  debug_post('Raw Title: ' + title + '\n' + 'Raw Story: ' + story);
  //
  /* remove bad words from title
  var story_array = story.split(" ");
  for (m = 0; m < story_array.length; m++) {
    debug_parse(story_array[i])
  }
  var lower_story = story.toLowerCase();
  var lower_story_array = lower_story.split(" ");
  for (i = 0; i < story_array.length; i++) {
    for (z = 0; z < expletives.length; z++) {
      if (lower_story_array[i] == expletives[z]) {
        debug_parse('a word match')
        var word_length = expletives[z].length;
        debug_parse('word_length: ' + word_length)
        var replacement_word = "";
        for (i = 0; i < word_length; i++) {
          replacement_word = replacement_word.concat("-")
        }
        debug_parse('replacement_word: ' + replacement_word)
        story_array[i] = replacement_word
        return
      }
    }
  }
  var temp_story = ""
  for (p = 0; p < story_array.length; p++) {
    temp_story.concat(story_array[i])
  }
  story = temp_story
  debug_post('Processed Story: ' + story); */

  //
  // parse: STORY downto NOUNS... save to an array... tags eg. ["NN", "NNP", "NNPS", "NNS"]
  var tags = ["NN", "NNP", "NNPS", "NNS"]
  debug_parse('test print before entering NLP_parser')
  parsed_sentence_array = NLP_parser_module.NLP_parse_words(story, tags)
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
        debug_search(searchterm_url_result) // print the URL of the first image returned via image-search
        return doneCallback(null, urlArray[0]); // pass through full results
      })
  }
  async.map(parsed_sentence_array, operation, function(err, results) {
    urls = results
    for (i = 0; i < urls.length; i++) {
      debug_save('Word: ' + parsed_sentence_array[i] + ' --- Url: ' + urls[i])
    }
    //
    // create JSON obj with our data
    var jsonObj = {}
    jsonObj.time = time_ops.current_time().datetime
    jsonObj.title = title
    jsonObj.story = story
    jsonObj.content = {}
    for (var i = 0; i < parsed_sentence_array.length; i++) {
      //set the keys and values
      //avoid dot notation for the key in this case
      //use square brackets to set the key to the value of the array element
      jsonObj.content[parsed_sentence_array[i]] = urls[i];
    }
    debug_db('BOOM')
    var str = JSON.stringify(jsonObj, null, 2); // spacing level = 2
    debug_db('jsonObj: ' + str)
    //
    // save to database
    //
    // set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get(process.env.COLLECTION);
    // Submit to the DB
    collection.insert(jsonObj, function(err, result) {
      if (err) {
        debug_db(err);
      } else {
        debug_db('Document inserted to db successfully');
      }
    });
    /*
    collection.insert({
      "title": title,
      "story": story,
      "content": [parsed_sentence_array, urls]
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
    */
  });
});

// serve display page (pass it db-data)
router.get('/display', function(req, res) {
  debug_get('recvd /display /get request')
  var db;
  var collection = {};
  db = req.db;
  // Set our collection
  var collection = db.get(process.env.COLLECTION);
  // return an array with the list of all the '_id' in the test_collection
  collection.find({}, {
    fields: {
      _id: 1
    }
  }, function(err, data) {
    if (err) {
      debug_db(err);
    } else {
      // create an array of all the '_ids' in the collection
      var times = data;
      // pick a random entry with which to pick an '_id' entry from the array
      var randomnumber = Math.floor(Math.random() * (times.length));
      //var randomnumber = times.length - 1
      // pick a random '_id'
      var query = times[randomnumber];
      var id = query._id
      // return the randomly-picked JSON from the db
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug_db(err)
        } else {
          // parse and send data to client html display-page
          res.render('display', {
            data: data,
            tabtitle: "Display: LetsFakeNews"
          });
        }
      });
    }
  });
});

// serve new_story to displaypage (pass it db-data)
router.get('/request_new_story', (req, res, next) => {
  debug_get('/GET request_new_story')
  var db;
  var collection = {};
  db = req.db;
  // Set our collection
  var collection = db.get(process.env.COLLECTION);
  // return an array with the list of all the '_id' in the test_collection
  collection.find({}, {
    fields: {
      _id: 1
    }
  }, function(err, data) {
    if (err) {
      debug_db(err);
    } else {
      // create an array of all the '_ids' in the collection
      var times = data;
      // pick a random entry with which to pick an '_id' entry from the array
      var randomnumber = Math.floor(Math.random() * (times.length));
      //var randomnumber = times.length - 1
      // pick a random '_id'
      var query = times[randomnumber];
      var id = query._id
      // return the randomly-picked JSON from the db
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug_db(err)
        } else {
          debug_db(data)
          // parse and send data to client html display-page
          res.send(data);
        }
      });
    }
  });
  /*
  res.render('index', {
    tabtitle: "LetsFakeNews"
  });
  */
  //res.send(process.env.MODE);
});

module.exports = router;
