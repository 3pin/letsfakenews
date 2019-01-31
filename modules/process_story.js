/*
receive a story as a string
process story for nouns
process nouns for URLs
return urls
*/

'use strict';
const debug = require('debug')('story')
const nlp = require('../modules/nlp.js');
const imagesearch_iterative = require('../modules/imagesearch_iterative.js');

module.exports = {

  process: function(input_story) {
    return new Promise(function(resolve, reject) {
      let story = input_story;
      nlp.parse_nouns(story).then(nouns => {
        imagesearch_iterative.iterative_url_search(nouns).then(urls => {
          resolve(urls);
        })
      }).catch((err) => {
        debug("Err: ", err);
      });
    });
  }
}
