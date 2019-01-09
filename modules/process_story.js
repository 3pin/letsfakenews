// process roundtrip taking story, processing words via NLP, listing image-urls via Google-API, returning array of urls

'use strict';
const debug = require('debug')('module_story')
const nlp = require('../modules/nlp.js');
const imagesearch_iterative = require('../modules/imagesearch_iterative.js');

module.exports = {

  process: function(input_story) {
    return new Promise(function(resolve, reject) {
      let story = input_story;
      nlp.parse_nouns(story).then(result => {
        imagesearch_iterative.iterative_url_search(result).then(result => {
          resolve(result);
        })
      }).catch((err) => {
        debug("Err: ", err);
      });
    });
  }
}
