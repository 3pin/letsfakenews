'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const time_ops = require('../../modules/time_ops.js');
const today = new Date();

describe('functions parsing date-time into formats used when adding JSONs to the db...', () => {

  it('should take datetime then return a string...', (done) => {
    time_ops.current_time(today).then((result) => {
      expect(result.time).to.be.a('string');
      expect(result.datetime).to.be.a('string');
      expect(result.dbname).to.be.a('string');
      done()
    })
  });

});
