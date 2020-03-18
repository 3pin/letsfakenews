
// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests');

// load assertion library
const chai = require('chai');

const { expect } = chai;

const dbFetchmode = require('../../modules/dbFetchMode.js');

describe('db-fetch-mode: testing random and sequential reading-from-db modes', () => {
  it('should take an array, select a random entry in array, return its value with key:id in a jsonOBJ...', () => {
    const result = dbFetchmode.randomEntry(['a', 'b', 'c']);
    debug(result);
    expect(result.id).to.be.a('string');
  });
  it('should take an array and an entry-to-pick that is <= array.length... return its value with key:id in a jsonOBJ...', () => {
    const result = dbFetchmode.nextEntry(['a', 'b', 'c'], 3);
    debug(result);
    expect(result.id).to.equal('a');
  });
});
