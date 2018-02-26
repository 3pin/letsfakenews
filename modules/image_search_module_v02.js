// module...
// takes a searchterm
// finds the first returned image from google-image-search
// prints the searchterm & URL
// saves as an entry to a JSON file
module.exports = {

  google_image_search: function(input_text) {

    let debug_module_search = require('debug')('module_search')

    var searchterm = input_text
    var searchterm_url_result

    const GoogleImages = require('google-images');
    var custom_search_engine_ID = '007494652346127192836:6cbemcp9dwc';
    var APIkey = 'AIzaSyBfpB5Rv9Eofz02DdT7G_cSe9FegCObJig';
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
        //return searchterm_url_result            // pass through full results
      })
    return searchterm_url_result
  }
};
