// process roundtrip taking story, processing words via NLP, listing image-urls via Google-API, returning array of urls

const debug = require('debug')('route_module')
const nlp_module = require('../modules/nlp_module.js');
const imagesearch_iterative_module = require('../modules/imagesearch_iterative_module.js');

module.exports = {

  process: function(input_story) {
    let story = input_story
    return new Promise(function(resolve, reject) {
      nlp_module.parse_nouns(story).then(function(result) {
          return imagesearch_iterative_module.iterative_url_search(result)
          //resolve(result)
        }, function(err) {
          debug(err)
          reject(err)
        }).then(result => {
          resolve(result)
        })
        .catch(function(err) {
          debug("Failed!", err);
        })
    })
  }
}
