/*
receive a JSON containing title & story items
process for nouns and add to JSON,
fetch image-url per noun and add to JSON
return JSON
*/

'use strict';
const debug = require('debug')('process_story')
const nlp = require('../modules/nlp.js');
const imagesearch_iterative = require('../modules/imagesearch_iterative.js');
const time_ops = require('../modules/time_ops.js');

module.exports = {

  process: function (client_JSON) {
    debug(client_JSON)
    var today = new Date();
    return new Promise(function (resolve, reject) {
      time_ops.current_time(today).then((result) => {
        // add current-time to the JSON
        client_JSON.time = result.time
        nlp.parse_nouns(client_JSON.story).then((words) => {
          if (words[0] === undefined) {
            debug('no words in story');
            resolve(null);
          } else {
            debug(words);
            // add nouns to the JSON
            client_JSON.words = words
            imagesearch_iterative.process(words).then((urls) => {
              debug(urls);
              // add URLs to the JSON
              client_JSON.urls = urls
              //resolve(client_JSON)
              nlp.parse_nouns(client_JSON.title).then((words_title) => {
                if (words_title[0] === undefined) {
                  debug('no words in title');
                  resolve(null);
                } else {
                  debug(words_title);
                  // add nouns to the JSON
                  client_JSON.words_title = words_title
                  imagesearch_iterative.process(words_title).then((urls_title) => {
                    debug(urls_title);
                    // add URLs to the JSON
                    client_JSON.urls_title = urls_title
                    resolve(client_JSON)
                  });
                }
              })
            })
          }
        })
      }).catch((err) => {
        debug("Err: ", err);
      });
    });
  }
}
