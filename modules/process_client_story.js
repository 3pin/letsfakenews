/*
receive a JSON containing title & story items
process for nouns and add to JSON,
fetch image-url per noun and add to JSON
return JSON
*/

'use strict';
const debug = require('debug')('client_story')
const nlp = require('../modules/nlp.js');
const imagesearch_iterative = require('../modules/imagesearch_iterative.js');
const time_ops = require('../modules/time_ops.js');

module.exports = {

  process: function(client_JSON) {
    debug(client_JSON)
    var today = new Date();
    //client_JSON.time = time_ops.current_time(today).datetime
    return new Promise(function(resolve, reject) {
      time_ops.current_time(today).then((result) => {
        // add current-time to the JSON
        client_JSON.time = result.time
        nlp.parse_nouns(client_JSON.story).then((words) => {
          // add nouns to the JSON
          client_JSON.words = words
          imagesearch_iterative.iterative_url_search(words).then((urls) => {
            // add URLs to the JSON
            client_JSON.urls = urls
            resolve(client_JSON)
          });
        });
      }).catch((err) => {
        debug("Err: ", err);
      });
    });
  }

}
