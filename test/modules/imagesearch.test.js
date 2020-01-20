'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

describe('Imagesearches: matching nouns-2-urls via google-API', () => {
  //
  it('should fetch an imageURL-string for a noun...', (done) => {
    const imagesearch = require('../../modules/imagesearch.js');
    imagesearch.single_url_search('cat').then((result) => {
      expect(result).to.be.a('string');
    }).then(() => {
      done();
    });
  });
  //
  it('should match each noun-from-array with an image-URL...', (done) => {
    const imagesearch_iterative = require('../../modules/imagesearch_iterative.js');
    let words = ['Pump', 'volume']
    imagesearch_iterative.process(words).then((result) => {
      expect(result).to.be.an('array');
    }).then(() => {
      done();
    }).catch(function (error) {
      debug("Failed!", error);
    })
  });
});
