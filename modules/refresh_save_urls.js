/*
GET a document via _id
REFRESH the url field in the document
UPDATE the document in the DB via _id/url
*/

'use strict';
const debug = require('debug')('refresh_save_urls');
const imagesearch_iterative = require('../modules/imagesearch_iterative.js');
// import mongoose schemas
const Story = require('../models/story.model');

module.exports = {

  process: function (id) {
    return new Promise((resolve, reject) => {
      Story.findById(id).then((doc) => {
        debug(doc);
        let words = doc.words;
        //debug('urls');
        debug(words);
        imagesearch_iterative.process(words).then((result) => {
          //debug('result');
          debug(result);
          Story.updateOne({
            _id: id
          }, {
            urls: result
          }).then(() => {
            debug('1 story updated');
          });
        })
      }).catch((error) => {
        debug("Failed!", error);
      });
    });
  }
}
