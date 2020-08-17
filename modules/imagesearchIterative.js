/* a module that...
takes an array of searchterms
matches searchterm:image via google-image-search
*/

const debug = require('debug')('imagesearchIterative');
const imagesearch = require('./imagesearch');

module.exports = {

  // for an array of nouns: find an image-url to match a noun
  process(inputArray) {
    debug(inputArray);
    return new Promise((resolve) => {
      const promises = inputArray.map(imagesearch.single_url_search);
      Promise.all(promises).then((result) => {
        debug(result);
        resolve(result);
      }).catch((error) => {
        debug('Failed!', error);
      });
    });
  },
};
