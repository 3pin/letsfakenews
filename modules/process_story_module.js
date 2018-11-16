// process roundtrip taking story, processing words via NLP, listing image-urls via Google-API, returning array of urls

'use strict';
const debug = require('debug')('process_story_module')
const nlp_module = require('../modules/nlp_module.js');
const imagesearch_iterative_module = require('../modules/imagesearch_iterative_module.js');

module.exports = {

  process: function(input_story) {
    return new Promise(function(resolve, reject) {
      let story = input_story;
      nlp_module.parse_nouns(story).then(result => {
        imagesearch_iterative_module.iterative_url_search(result).then(result => {
          resolve(result);
        })
      }).catch((err) => {
        debug("Err: ", err);
      });
    });
  }
}
