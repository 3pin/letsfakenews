/*
takes a JSON-obj
extracts its nouns field to an []
via middleware... creates a urls[] per item in nouns[]
replaces the urls field in the JSON
returns the updated JSON-obj
*/

const debug = require('debug')('refresh_urls');
const imagesearchIterative = require('./imagesearchIterative.js');

module.exports = {
  process(object) {
    const obj = object;
    debug(obj);
    return new Promise((resolve) => {
      const { words } = obj;
      debug(words);
      imagesearchIterative.process(words).then((urls) => {
        debug(urls);
        obj.urls = urls;
        debug(obj);
        resolve(obj);
      });
    });
  },
};
