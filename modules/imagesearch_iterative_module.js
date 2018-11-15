/* a module that...
takes a searchterm
finds the first returned image from google-image-search
prints the searchterm & URL
saves as an entry to a JSON file */

const debug = require('debug')('imagesearch_iterative_module')
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CUSTOM_SEARCH_ENGINE_ID, process.env.CUSTOM_SEARCH_APIKEY);
const searchSettings = {
  searchType: 'image',
  safe: 'high'
}

const imagesearch_module = require('../modules/imagesearch_module.js');

module.exports = {

  //for an array of nouns: find an image-url to match a noun
  iterative_url_search: function(input_array) {
    let array = input_array
    return new Promise(function(resolve, reject) {
      var promises = array.map(imagesearch_module.single_url_search)
      Promise.all(promises).then(
        function(result) {
          debug(result)
          resolve(result)
        }).catch(function(error) {
        debug("Failed!", error);
      })
    })
  }
};
