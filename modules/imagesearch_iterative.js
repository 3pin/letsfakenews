/* a module that...
takes a searchterm
finds the first returned image from google-image-search
prints the searchterm & URL
saves as an entry to a JSON file
*/

'use strict';
const debug = require('debug')('module_imagesearch_iterative')
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CUSTOM_SEARCH_ENGINE_ID, process.env.CUSTOM_SEARCH_APIKEY);
const searchSettings = {
  searchType: 'image',
  safe: 'high'
}
const imagesearch = require('../modules/imagesearch.js');

module.exports = {

  //for an array of nouns: find an image-url to match a noun
  iterative_url_search: function(input_array) {
    let array = input_array
    return new Promise((resolve, reject) => {
      var promises = array.map(imagesearch.single_url_search)
      Promise.all(promises).then((result) => {
          resolve(result)
        }).catch((error) => {
        debug("Failed!", error);
      });
    });
  }
};
