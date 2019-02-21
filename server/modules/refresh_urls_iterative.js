/* a module that...
takes a searchterm
finds the first returned image from google-image-search
prints the searchterm & URL
saves as an entry to a JSON file
*/

'use strict';
const debug = require('debug')('refresh_urls_iterative');
const refresh_urls = require('../modules/refresh_urls.js');

module.exports = {

  //for an array of nouns: find an image-url to match a noun
  process: function(input_array) {
    let array = input_array
    return new Promise((resolve, reject) => {
      var promises = array.map(refresh_urls.process)
      Promise.all(promises).then((result) => {
          resolve(result)
        }).catch((error) => {
        debug("Failed!", error);
      });
    });
  }
};
