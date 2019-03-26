/*
takes an array ids that reference DB-documents
iteratively passes on each id for its url field to be refreshed/saved
*/

'use strict';
const debug = require('debug')('refresh_save_urls_iterative');
const refresh_save_urls = require('../modules/refresh_save_urls.js');

module.exports = {

  //for an array of nouns: find an image-url to match a noun
  process: function (idArray) {
    debug(idArray);
    return new Promise((resolve, reject) => {
      var promises = idArray.map(refresh_save_urls.process)
      Promise.all(promises).then((result) => {
        debug(result);
        resolve(result);
      }).catch((error) => {
        debug("Failed!", error);
      });
    });
  }
};
