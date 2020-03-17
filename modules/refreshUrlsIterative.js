/*
takes an array of DB documents
processes the URLS field in each
return the updates array of DB documents
*/

'use strict'
const debug = require('debug')('refresh_urls_iterative')
const refreshUrls = require('../modules/refreshUrls.js')

module.exports = {

  // for an array of nouns: find an image-url to match a noun
  process: function (inputArray) {
    // debug(inputArray);
    return new Promise((resolve, reject) => {
      var promises = inputArray.map(refreshUrls.process)
      Promise.all(promises).then((result) => {
        resolve(result)
        // debug(result);
      }).catch((error) => {
        debug('Failed!', error)
      })
    })
  }
}
