// check the env
if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  const dotEnvPath = path.resolve('./.env');
  const dotenv = require('dotenv')
  const result = dotenv.config({ path: dotEnvPath})
  if (result.error) {
    throw result.parsed
  }
}

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

// load async for use in tests
const async = require('async');

const imagesearch_iterative_module = require('../modules/imagesearch_iterative_module.js');

describe('iterative-url-search of the google-API', function() {
  it('should match each noun-from-array with an image-URL...', (done) => {
    let words = ['Pump','volume']
    //let input_array = ['cat', 'dog']
    imagesearch_iterative_module.iterative_url_search(words).then(result => {
      expect(result).to.be.an('array');
    }).catch(function(error) {
      console.log("Failed!", error);
    }).finally(done)
  })
});

/*
describe('iterative search of the google-API', function() {
  it('should match each noun-from-array with an image-URL...', (done) => {
    let input_array = ['cat', 'dog']
    var promises = input_array.map(image_search_module.single_url_search)
    Promise.all(promises).then(result => {
      expect(result).to.be.an('array')
      done()
    }).catch(function(error) {
      console.log("Failed!", error);
    })
  })
});
*/
