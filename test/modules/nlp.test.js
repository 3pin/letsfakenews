'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const nlp = require('../../modules/nlp.js');

describe('When a new fakenewsreport (story) is received...', () => {
  
  it('should NLP the story(string) to an array of nouns...', (done) => {
    nlp.parse_nouns('Shit the cat ran under the bus fuck').then(result => {
      expect(result).to.be.an('array');
    }).finally(done);
  });

  it('should NLP the story(string) to an array of nouns PER phrase...', (done) => {
    nlp.parse_phrases('The cat ran under the bus. It was hurt').then((result) => {
      expect(result).to.be.an('array');
    }).finally(done);
  });

});
