
// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests');

// load assertion library
const chai = require('chai');

const { expect } = chai;

const imagesearch = require('../../modules/imagesearch.js');
const imagesearchIterative = require('../../modules/imagesearchIterative.js');

describe('Imagesearches: matching nouns-2-urls via google-API', () => {
  //
  it('should fetch an imageURL-string for a noun...', (done) => {
    imagesearch.single_url_search('cat').then((result) => {
      expect(result).to.be.a('string');
    }).then(() => {
      done();
    });
  });
  //
  it('should match each noun-from-array with an image-URL...', (done) => {
    const words = ['Pump', 'volume'];
    imagesearchIterative.process(words).then((result) => {
      expect(result).to.be.an('array');
    }).then(() => {
      done();
    }).catch((error) => {
      debug('Failed!', error);
    });
  });
});
