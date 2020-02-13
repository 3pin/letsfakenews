/* a module that...
takes a searchterm
matches searchterm:image via google-image-search
*/

'use strict';
const debug = require('debug')('imagesearch')
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CUSTOM_SEARCH_ENGINE_ID, process.env.CUSTOM_SEARCH_APIKEY);
/*
GoogleImages size-options: icon, small, medium, large, xlarge, xxlarge, huge
(cc_publicdomain | cc_attribute%7Ccc_sharealike | cc_nonderived ! cc_noncommercial
imgType: photo, face, stock
*/
const searchSettings = {
  c2coff: '1',
  fileType: 'jpg ',
  imgSize: 'huge',
  imgType: 'photo',
  linkSite: 'yes',
  lr: 'lang_en',
  rights: '!cc_noncommercial',
  safe: 'high',
  searchType: 'image',
  siteSearch: 'https://www.facebook.com/',
  siteSearchFilter: 'e'
}

module.exports = {
  //find an image-url to match a noun
  single_url_search: function(input_text) {
    return new Promise(function(resolve, reject) {
      let searchterm = input_text
      debug(searchterm);
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
