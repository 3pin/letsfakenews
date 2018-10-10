/*
const mode = process.env.NODE_ENV
const client_mode = process.env.CLIENT_DEBUG_MODE
const port = process.env.PORT || 5000
const uri = process.env.MONGODB_URI
const db_collection = process.env.COLLECTION
const db_feedback = process.env.FEEDBACK
*/

var debug = require('debug')('index')
debug('Port:' + process.env.PORT + ' mode:' + process.env.NODE_ENV + ' client_mode:' + process.env.CLIENT_DEBUG_MODE + ' db_uri:' + process.env.MONGODB_URI + ' db_collection: ' + process.env.COLLECTION + ' db_feedback: ' + process.env.FEEDBACK)

// load middle-ware modules
var NLP_parser_module = require('../modules/NLP_parser_module.js');
//var image_search_module = require('../modules/image_search_module.js')
var time_ops = require('../modules/time_ops.js');
// authorization
var auth = require("http-auth");
var digest = auth.digest({
  realm: "Private area",
  file: "./htpasswd",
  authType: "digest"
});
function middleware_auth(req, res, next) {
  //console.log('middleware_auth: this page requires authentification')
  (auth.connect(digest))(req, res, next);
  //return next()
}

const express = require('express');
const router = express.Router();

//read-mode, new_story || random_story
var db_mode = 'new_story';
// array of the entry_times of each database entry
var db_entry_times;
// db entry to read
var entry_to_read;
// newest_entry_read
var newest_entry_read = 0;

// serve homepage /index
router.get('/', (req, res) => {
  debug('/GET msg to index page')
  res.render('index', {
    tabtitle: "LetsFakeNews:Input"
  });
  //res.send(process.env.MODE);
});

// serve mode-data to a client
router.get('/mode', (req, res) => {
  debug('/GET mode msg')
  res.send(process.env.CLIENT_DEBUG_MODE);
});

// serve new_story to displaypage (pass it db-data)
router.get('/request_new_story', (req, res) => {
  debug('/GET request_new_story')
  // set our internal DB variable
  var db = req.db;
  // Set our collection
  var collection = db.get(process.env.COLLECTION);
  // return an array with the list of all the '_id' in the test_collection
  collection.find({}, {
    fields: {
      _id: 1
    }
  }, function(err, data) {
    if (err) {
      debug(err);
    } else {
      // create an array of all the '_ids' in the collection
      db_entry_times = data;
      //check mode
      if (db_mode == 'new_story') {
        debug('Using mode: ' + db_mode)
        newest_entry_read++;
        entry_to_read = newest_entry_read;
        if (entry_to_read == db_entry_times.length - 1) {
          db_mode = 'random_story'
          debug('Mode switch: ' + db_mode)
          //newest_entry_read = db_entry_times.length-1;
        }
      } else if (db_mode == 'random_story') {
        debug('Using mode: ' + db_mode)
        // pick a random entry with which to pick an '_id' entry from the array
        var randomnumber = Math.floor(Math.random() * (db_entry_times.length));
        entry_to_read = randomnumber
      }
      var display_num = entry_to_read + 1
      debug('About to read entry:' + display_num + ' of:' + db_entry_times.length)
      var query = db_entry_times[entry_to_read];
      var id = query._id
      //increment the db_entry to read for next time around
      // return the randomly-picked JSON from the db
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug(err)
        } else {
          debug(data.title)
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

// serve display page (pass it db-data)
router.get('/display', middleware_auth, (req, res) => {
  debug('recvd /display /get request')
  // set our internal DB variable
  var db = req.db;
  // Set our collection
  var collection = db.get(process.env.COLLECTION);
  // return an array with the list of all the '_id' in the test_collection
  collection.find({}, {
    fields: {
      _id: 1
    }
  }, function(err, data) {
    if (err) {
      debug(err);
    } else {
      // create an array of all the '_ids' in the collection
      db_entry_times = data;
      //check mode
      if (db_mode == 'new_story') {
        debug('Using mode: ' + db_mode)
        newest_entry_read = db_entry_times.length - 1;
        entry_to_read = newest_entry_read;
        if (entry_to_read == db_entry_times.length - 1) {
          db_mode = 'random_story'
          debug('Mode switch: ' + db_mode)
          //newest_entry_read = db_entry_times.length-1;
        }
      } else if (db_mode == 'random_story') {
        debug('Using mode: ' + db_mode)
        // pick a random entry with which to pick an '_id' entry from the array
        var randomnumber = Math.floor(Math.random() * (db_entry_times.length));
        entry_to_read = randomnumber
      }
      var display_num = entry_to_read + 1
      debug('About to read entry:' + display_num + ' of:' + db_entry_times.length)
      var query = db_entry_times[entry_to_read];
      var id = query._id
      /*
      //increment the db_entry to read for next time around
      if (entry_to_read < db_entry_times.length - 1) {
        entry_to_read++
      } else {
        entry_to_read = 0;
      }
      */
      // return the randomly-picked JSON from the db
      collection.findOne({
        _id: id
      }, function(err, data) {
        if (err) {
          debug(err)
        } else {
          // parse and send data to client html display-page
          res.render('display', {
            data: data,
            tabtitle: "LetsFakeNews:Display"
          });
        }
      });
    }
  });
});

// receive title-story info
router.post('/add_title_story', (req, res) => {
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
  debug('Raw Title: ' + title + '\n' + 'Raw Story: ' + story);
  //
  debug('test print before entering NLP_parser')
  parsed_sentence_array = NLP_parser_module.NLP_parse_words(story)
  for (let item of parsed_sentence_array) {
    debug('pos: ' + item)
  }
  //
  // search: fetch a URL for each NOUN
  const async = require('async');
  var operation = function(input_text, doneCallback) {
    var searchterm = input_text
    var searchterm_url_result
    var custom_search_engine_ID = process.env.CUSTOM_SEARCH_ENGINE_ID;
    var APIkey = process.env.CUSTOM_SEARCH_APIKEY;
    const GoogleImages = require('google-images');
    const client = new GoogleImages(custom_search_engine_ID, APIkey);
    var searchSettings = {
      searchType: 'image',
      safe: 'high'
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
        var num_of_result = Math.floor(Math.random() * urlArray.length);
        searchterm_url_result = searchterm + ': ' + urlArray[num_of_result]
        debug('No of result: ' + num_of_result + ' ' + searchterm_url_result) // print the URL of the first image returned via image-search
        return doneCallback(null, urlArray[num_of_result]); // pass through full results
      })
  }
  async.map(parsed_sentence_array, operation, function(err, results) {
    urls = results
    for (i = 0; i < urls.length; i++) {
      debug('Word: ' + parsed_sentence_array[i] + ' --- Url: ' + urls[i])
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
    var str = JSON.stringify(jsonObj, null, 2); // spacing level = 2
    debug('jsonObj: ' + str)
    // set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get(process.env.COLLECTION);
    // save to database
    collection.insert(jsonObj, function(err, result) {
      if (err) {
        debug(err);
      } else {
        debug('Document inserted to db successfully');
        db_mode = 'new_story';
        debug('Mode switch: ' + db_mode);
        //
        // return an array with the list of all the '_id' in the test_collection
        collection.find({}, {
          fields: {
            _id: 1
          }
        }, function(err, data) {
          if (err) {
            debug(err);
          } else {
            db_entry_times = data;
            debug('Total number of db_entries now: ' + db_entry_times.length)
          }
        });
      }
    });
  });
});

// receive title-story info
router.post('/add_feedback', (req, res) => {
  //
  //variables to be set and later saved to a
  var feedback;
  //
  // Get our form values. These rely on the "name" attributes
  feedback = req.body.feedback;
  debug('Raw feedback: ' + feedback);
  //
  // save to database
  // create JSON obj with our data
  var jsonObj = {}
  jsonObj.time = time_ops.current_time().datetime
  jsonObj.fedback = feedback
  // set our internal DB variable
  var db = req.db;
  // Set our collection
  var collection = db.get(process.env.FEEDBACK);
  // Submit to the DB
  collection.insert(jsonObj, function(err, result) {
    if (err) {
      debug(err);
    } else {
      debug('Feedback inserted to db successfully');
    }
  });
});

module.exports = router;
