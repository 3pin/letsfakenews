/*
receive a JSON containing title & story items
process for nouns and add to JSON,
fetch image-url per noun and add to JSON
return JSON
*/


const debug = require('debug')('process_story');
const nlp = require('./nlp.js');
const imagesearchIterative = require('./imagesearchIterative.js');
const timeOps = require('./timeOps.js');

module.exports = {

  process(client) {
    const clientJSON = client
    debug(clientJSON);
    const today = new Date();
    return new Promise(((resolve) => {
      timeOps.current_time(today).then((result) => {
        // add current-time to the JSON
        clientJSON.time = result.time;
        nlp.parse_nouns(clientJSON.story).then((words) => {
          if (words[0] === undefined) {
            debug('no words in story');
            resolve(null);
          } else {
            debug(words);
            // add nouns to the JSON
            clientJSON.words = words;
            imagesearchIterative.process(words).then((urls) => {
              debug(urls);
              // add URLs to the JSON
              clientJSON.urls = urls;
              // resolve(clientJSON)
              nlp.parse_nouns(clientJSON.title).then((wordsTitle) => {
                if (wordsTitle[0] === undefined) {
                  debug('no words in title');
                  resolve(null);
                } else {
                  debug(wordsTitle);
                  // add nouns to the JSON
                  clientJSON.wordsTitle = wordsTitle;
                  imagesearchIterative.process(wordsTitle).then((urlsTitle) => {
                    debug(urlsTitle);
                    // add URLs to the JSON
                    clientJSON.urlsTitle = urlsTitle;
                    resolve(clientJSON);
                  });
                }
              });
            });
          }
        });
      }).catch((err) => {
        debug('Err: ', err);
      });
    }));
  },
};
