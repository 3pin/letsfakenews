'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const refresh_urls = require('../../modules/refresh_urls.js');

describe('Refresh a stories urls', () => {
  it('fetch words into an []... match each with a url in a new []... replace url[] with url[]', (done) => {
    let obj = {
      "words": ["thursday", "friday"],
      "urls": ["https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg", "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg"]
    }
    refresh_urls.process(obj).then((result) => {
      expect(result.urls.length).to.equal(result.words.length);
      done();
    });
  });
});
