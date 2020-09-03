/*
receive a story as a string
process story for nouns
process nouns for URLs
return urls
*/

const debug = require('debug')('processStory');
const nlp = require('./nlp.js');
const imagesearchIterative = require('./imagesearchIterative.js');

module.exports = {

  process(inputStory) {
    return new Promise(((resolve, reject) => {
      const story = inputStory;
      nlp.parse_nouns(story).then((nouns) => {
        imagesearchIterative.process(nouns).then((urls) => {
          resolve(urls);
        });
      }).catch((err) => {
        debug('Err: ', err);
        reject(err)
      });
    }));
  },
};
