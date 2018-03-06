// module...
// takes a searchterm
// finds the first returned image from google-image-search
// prints the searchterm & URL
// saves as an entry to a JSON file
module.exports = {

  google_image_search: async function(input_text, doneCallback) {
    let debug_module_search = require('debug')('module_search')
    var searchterm = input_text
    var searchterm_url_result
    const GoogleImages = require('google-images');
    var custom_search_engine_ID = process.env.CUSTOM_SEARCH_ENGINE_ID;
    var APIkey = process.env.CUSTOM_SEARCH_APIKEY;
    const client = new GoogleImages(custom_search_engine_ID, APIkey);
    var searchSettings = {
      searchType: 'image',
      size: 'xlarge',
      safe: 'high',
      imgColorType: 'color'
    }
    var urlArray = []
    client.search(searchterm, searchSettings).then(
      function(image_search_results) {
        //console.log(print_results)
        for (let value of image_search_results) {
          var item = value;
          if (item.url) {
            urlArray.push(item.url)
          }
        }
        searchterm_url_result = searchterm + ': ' + urlArray[0]
        debug_module_search(searchterm_url_result) // print the URL of the first image returned via image-search
        return doneCallback(null, searchterm_url_result); // pass through full results
      })
  }
};
