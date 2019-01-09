/* a module that...
takes a searchterm
finds the first returned image from google-image-search
prints the searchterm & URL
saves as an entry to a JSON file */

'use strict';
const debug = require('debug')('module_imagesearch')
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CUSTOM_SEARCH_ENGINE_ID, process.env.CUSTOM_SEARCH_APIKEY);
const searchSettings = {
  searchType: 'image',
  safe: 'high'
}

module.exports = {

  //find an image-url to match a noun
  single_url_search: function(input_text) {
    return new Promise(function(resolve, reject) {
      let searchterm = input_text
      debug(searchterm)
      client.search(searchterm, searchSettings).then((result) => {
        let urlArray = []
        for (let value of result) {
          let item = value;
          if (item.url) {
            urlArray.push(item.url)
          }
        }
        let num_of_result = Math.floor(Math.random() * urlArray.length);
        debug(urlArray[num_of_result])
        resolve(urlArray[num_of_result])
      }).catch(function(error) {
        debug("Failed!", error);
      });
    });
  }

};
