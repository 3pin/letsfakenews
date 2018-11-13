var debug = require('debug')('process_client_module')

const nlp_module = require('../modules/nlp_module.js');
const imagesearch_iterative_module = require('../modules/imagesearch_iterative_module.js');
const time_ops = require('../modules/time_ops.js');

module.exports = {

  process: function(client_JSON) {
    debug(client_JSON)
    client_JSON.time = time_ops.current_time().datetime
    return new Promise(function(resolve, reject) {
      nlp_module.parse_nouns(client_JSON.story).then(function(words) {
        client_JSON.words = words
        imagesearch_iterative_module.iterative_url_search(words).then(function(urls) {
          client_JSON.urls = urls
          debug(client_JSON)
          resolve(client_JSON)
        }, function(err) {
          reject(err)
        })
      }, function(err) {
        reject(err)
      }).catch(function(err) {
        debug("Failed!", err);
      })
    })
  }
}
