'use strict';
// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const db_fetch_mode = require('../../modules/db_fetch_mode.js');

describe('testing functions controlling fetch-mode of stories from the db...', () => {
  it('should take an array, select a random entry in array, return its value with key:id in a jsonOBJ...', () => {
    let result = db_fetch_mode.random_entry(['a','b','c'])
    debug(result)
    expect(result.id).to.be.a('string')
  })
  it('should take an array and an entry-to-pick that is <= array.length... return its value with key:id in a jsonOBJ...', () => {
    let result = db_fetch_mode.next_entry(['a','b','c'], 3)
    debug(result)
    expect(result.id).to.equal('a')
  })
});
