'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const refresh_urls_iterative = require('../../modules/refresh_urls_iterative.js');

describe('When button-pressed... refresh each stories urls', () => {
  it('for every db_entry: fetch nouns... match with urls... replace old_urls', (done) => {
    let JSON_array = [{
        "words": ["tuesday", "wednesday"],
        "urls": ["https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg", "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg"]
      },
      {
        "words": ["thursday", "friday"],
        "urls": ["https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg", "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg"]
      }
    ];
    refresh_urls_iterative.process(JSON_array).then((result) => {
      expect(result.length).to.equal(JSON_array.length);
    }).catch(function(error) {
      debug("Failed!", error);
    }).finally(done)
  });
});