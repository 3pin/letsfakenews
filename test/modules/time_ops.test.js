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

describe('Timestamp: adding date-time to OBJs before saving to db...', () => {
  it('should take datetime then return a string...', (done) => {
    time_ops.current_time(today).then((result) => {
      expect(result.time).to.be.a('string');
      expect(result.datetime).to.be.a('string');
      expect(result.dbname).to.be.a('string');
      done()
    })
  });

});
