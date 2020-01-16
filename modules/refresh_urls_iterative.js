/*
takes an array of DB documents
processes the URLS field in each
return the updates array of DB documents
*/

'use strict';
const debug = require('debug')('refresh_urls_iterative');
const refresh_urls = require('../modules/refresh_urls.js');

module.exports = {

  //for an array of nouns: find an image-url to match a noun
  process: function(input_array) {
    //debug(input_array);
    return new Promise((resolve, reject) => {
      var promises = input_array.map(refresh_urls.process)
      Promise.all(promises).then((result) => {
          resolve(result);
          //debug(result);
        }).catch((error) => {
        debug("Failed!", error);
      });
    });
  }
};
