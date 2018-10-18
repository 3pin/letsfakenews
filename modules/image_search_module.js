// module...
// takes a searchterm
// finds the first returned image from google-image-search
// prints the searchterm & URL
// saves as an entry to a JSON file

const debug = require('debug')('image_search_module')

const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CUSTOM_SEARCH_ENGINE_ID, process.env.CUSTOM_SEARCH_APIKEY);
const searchSettings = {
  searchType: 'image',
  safe: 'high'
}

module.exports = {

  single_image_search: function(input_text) {
    let searchterm = input_text
    let result
    client.search(searchterm, searchSettings)
    /*
    client.search(searchterm, searchSettings).then(
      function(err) {
        debug(err)
        return
      },
      function(result) {
        debug(result)
        return
      }
    );
    */
  },

  google_image_search: function(input_text, doneCallback) {
    let searchterm = input_text
    let result
    client.search(searchterm, searchSettings).then(
      function(image_search_results) {
        let urlArray = []
        for (let value of image_search_results) {
          let item = value;
          if (item.url) {
            urlArray.push(item.url)
          }
        }
        let num_of_result = Math.floor(Math.random() * urlArray.length);
        searchterm_url_result = searchterm + ': ' + urlArray[num_of_result]
        debug('No of result: ' + num_of_result + ' ' + searchterm_url_result) // print the URL of the first image returned via image-search
        return doneCallback(null, urlArray[num_of_result]); // pass through full results
      })
  }

};
