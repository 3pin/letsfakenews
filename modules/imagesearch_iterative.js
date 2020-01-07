/* a module that...
takes an array of searchterms
matches searchterm:image via google-image-search
*/

'use strict';
const debug = require('debug')('imagesearch_iterative')
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CUSTOM_SEARCH_ENGINE_ID, process.env.CUSTOM_SEARCH_APIKEY);
const searchSettings = {
  searchType: 'image',
  safe: 'high'
}
const imagesearch = require('../modules/imagesearch');

module.exports = {

  //for an array of nouns: find an image-url to match a noun
  process: function (input_array) {
    debug(input_array);
    return new Promise((resolve, reject) => {
      var promises = input_array.map(imagesearch.single_url_search)
      Promise.all(promises).then((result) => {
        debug(result);
        resolve(result);
      }).catch((error) => {
        debug("Failed!", error);
      });
    });
  }
};
