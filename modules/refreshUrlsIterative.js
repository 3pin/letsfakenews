/*
takes an array of DB documents
processes the URLS field in each
return the updates array of DB documents
*/

const debug = require('debug')('refresh_urls_iterative');
const refreshUrls = require('./refreshUrls.js');

module.exports = {

  // for an array of nouns: find an image-url to match a noun
  process(inputArray) {
    // debug(inputArray);
    return new Promise((resolve) => {
      const promises = inputArray.map(refreshUrls.process);
      Promise.all(promises).then((result) => {
        resolve(result);
        // debug(result);
      }).catch((error) => {
        debug('Failed!', error);
      });
    });
  },
};
