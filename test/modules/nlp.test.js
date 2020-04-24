// load the ENVIRONMENT variables
require('dotenv').config();

// load assertion library
const chai = require('chai');

const {
  expect,
} = chai;

const nlp = require('../../modules/nlp.js');

describe('NLP: testing parsing of nouns...', () => {
  it('should NLP the story(string) to an array of nouns...', (done) => {
    nlp.parse_nouns('Shit the cat ran under the bus fuck').then((result) => {
      expect(result).to.be.an('array');
    }).finally(done);
  });

  it('should NLP the story(string) to an array of nouns PER phrase...', (done) => {
    nlp.parse_phrases('The cat ran under the bus. It was hurt').then((result) => {
      expect(result).to.be.an('array');
    }).finally(done);
  });
});
