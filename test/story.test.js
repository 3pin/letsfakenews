//load .env variables
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

// load assertion library
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

describe('When a new fakenewsreport (title & story) is received...', function() {
  it('should NLP the story(string) to nouns(array)...)', function() {
    var nlp_module = require('../modules/nlp_parser_module.js');
    var result = nlp_module.NLP_parse_words('The cat ran under the bus')
    expect(result).to.be.an('array').that.is.not.empty;
  })
});
describe('unit search of the google-API', function() {
  it('a noun should return an image URL from the google-API', function(done) {
    var image_search_module = require('../modules/image_search_module.js');
    image_search_module.single_image_search('cat', processor);
    function processor(result){
      console.log(result)
    }
    var result = processor()
    //expect(result).to.be.a('string');
    expect(result).to.be.an('array')
    done();
  });
});
describe('searching the google-API', function() {
  it('should match nouns(array) to a new images-URLs(array)...', function(done) {
    var url_module = require('../modules/image_search_module.js');
    var result = url_module.google_image_search(['cat', 'dog'], result)
    expect(result)
    //expect(result).to.be.an('array');
    done();
  })
});
describe('saving to the database', function() {
  it('should SAVE variables to database... story(string) / title(string) / nouns(list) / urls(list)', function() {
    var save_module = require('../modules/save_toDB_module.js');
    //
    var result
    expect(result.to.be.boolean)
    // various lines of setup
    //expect('bla').to.be.()
    //bla.should.be.equal(2)
  })
});
