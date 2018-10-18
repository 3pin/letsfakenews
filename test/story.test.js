//load .env variables
const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({
  path: dotEnvPath
});

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

describe('When a new fakenewsreport (title & story) is received...', function() {
  it('should NLP the story(string) to nouns(array)...)', function() {
    const nlp_module = require('../modules/nlp_parser_module.js');
    let result = nlp_module.NLP_parse_words('The cat ran under the bus')
    expect(result).to.be.an('array').that.is.not.empty;
  })
});
describe('unit search of the google-API', function() {
  it('a noun should return an image URL from the google-API', function(done) {
    const image_search_module = require('../modules/image_search_module.js');
    //let output
    image_search_module.single_image_search('cat').then(
      expect(output).to.be.an('array');
      done();
    )
  });
});
describe('searching the google-API', function() {
  it('should match nouns(array) to a new images-URLs(array)...', function(done) {
    const url_module = require('../modules/image_search_module.js');
    let result = url_module.google_image_search(['cat', 'dog'], result)
    expect(result)
    //expect(result).to.be.an('array');
    done();
  })
});
describe('saving to the database', function() {
  it('should SAVE variables to database... story(string) / title(string) / nouns(list) / urls(list)', function() {
    const save_module = require('../modules/save_toDB_module.js');
    //
    let result
    expect(result.to.be.boolean)
    // various lines of setup
    //expect('bla').to.be.()
    //bla.should.be.equal(2)
  })
});
