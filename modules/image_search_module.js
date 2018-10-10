// module...
// takes a searchterm
// finds the first returned image from google-image-search
// prints the searchterm & URL
// saves as an entry to a JSON file

var debug = require('debug')('image_search_module')

module.exports = {

  single_image_search: function(input_text) {
    var searchterm = input_text
    var searchterm_url_result
    //var custom_search_engine_ID = process.env.CUSTOM_SEARCH_ENGINE_ID;
    //var APIkey = process.env.CUSTOM_SEARCH_APIKEY;
    const GoogleImages = require('google-images');
    const client = new GoogleImages(process.env.CUSTOM_SEARCH_ENGINE_ID, process.env.CUSTOM_SEARCH_APIKEY);
    var searchSettings = {
      searchType: 'image',
      safe: 'high'
    }
    client.search(searchterm, searchSettings).then(
      function(result){
        //console.log(result)
        return result; // pass through full results
      })
  },

  google_image_search: function(input_text, doneCallback) {
    var searchterm = input_text
    var searchterm_url_result
    var custom_search_engine_ID = process.env.CUSTOM_SEARCH_ENGINE_ID;
    var APIkey = process.env.CUSTOM_SEARCH_APIKEY;
    const GoogleImages = require('google-images');
    const client = new GoogleImages(custom_search_engine_ID, APIkey);
    var searchSettings = {
      searchType: 'image',
      safe: 'high'
    }
    client.search(searchterm, searchSettings).then(
      function(image_search_results) {
        var urlArray = []
        //console.log(print_results)
        for (let value of image_search_results) {
          var item = value;
          if (item.url) {
            urlArray.push(item.url)
          }
        }
        var num_of_result = Math.floor(Math.random() * urlArray.length);
        searchterm_url_result = searchterm + ': ' + urlArray[num_of_result]
        debug('No of result: ' + num_of_result + ' ' + searchterm_url_result) // print the URL of the first image returned via image-search
        return doneCallback(null, urlArray[num_of_result]); // pass through full results
      })
  }

};
