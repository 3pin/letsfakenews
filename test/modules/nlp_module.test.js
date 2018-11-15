// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const nlp_module = require('../../modules/nlp_module.js');

describe('When a new fakenewsreport (story) is received...', function() {
  it('should NLP the story(string) to an array of nouns...', (done) => {
    nlp_module.parse_nouns('The cat ran under the bus').then(result => {
      expect(result).to.be.an('array');
    }).finally(done);
  })
});
