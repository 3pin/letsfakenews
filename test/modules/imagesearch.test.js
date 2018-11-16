'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

// load async for use in tests
const async = require('async');

const imagesearch = require('../../modules/imagesearch.js');

//test .then Promise
describe('single-url-search of the google-API', () => {
  it('should fetch an imageURL-string for a noun...', (done) => {
    imagesearch.single_url_search('cat').then((result) => {
      expect(result).to.be.a('string');
    }).finally(done);
  });
});

/*
//test async-await Promise
describe('single-url-search of the google-API', function() {
  it('should fetch an imageURL-string for a noun...', async () => {
    let result = await imagesearch_module.single_url_search('cat');
    expect(result).to.be.a('string');
  });
});
*/
