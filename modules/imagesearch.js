/* a module that...
takes a searchterm
matches searchterm:image via google-image-search
*/

const debug = require('debug')('imagesearch');
const GoogleImages = require('google-images');

const client = new GoogleImages(global.gConfig.customSearchEngineId, global.gConfig.customSearchApikey);
// const client = new GoogleImages(global.gConfig.customSearchEngineId, global.gConfig.customSearchApikey);
/*
GoogleImages size-options: icon, small, medium, large, xlarge, xxlarge, huge
(cc_publicdomain | cc_attribute%7Ccc_sharealike | cc_nonderived ! cc_noncommercial
imgType: photo, face, stock
*/

const _searchSettings = {
  c2coff: '1',
  imgSize: 'huge',
  imgType: 'photo',
  linkSite: 'yes',
  lr: 'lang_en',
  rights: '!cc_noncommercial',
  safe: 'high',
  searchType: 'image',
  siteSearch: 'https://www.facebook.com',
  siteSearchFilter: 'e',
};
const searchSettings = {
  filter: '1',
  googleHost: 'google.com',
  imgSize: 'huge',
  imgType: 'photo',
  linkSite: 'yes',
  language: 'en',
  rights: 'cc_publicdomain',
  safe: 'high',
  searchType: 'image',
  siteSearch: 'https://www.facebook.com',
  siteSearchFilter: 'e',
};

module.exports = {
  // find an image-url to match a noun
  single_url_search(inputText) {
    return new Promise(((resolve) => {
      const searchterm = inputText;
      debug(searchterm);
      client.search(searchterm, searchSettings).then((result) => {
        const urlArray = [];
        result.forEach((value) => {
          const item = value;
          if (item.url) {
            urlArray.push(item.url);
          }
        })
        const numOfResult = Math.floor(Math.random() * urlArray.length);
        debug(urlArray[numOfResult]);
        resolve(urlArray[numOfResult]);
      }).catch((error) => {
        debug('Failed!', error);
      });
    }));
  },

};
