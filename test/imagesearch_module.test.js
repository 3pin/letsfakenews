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

const imagesearch_module = require('../modules/imagesearch_module.js');

//test .then Promise
describe('single-url-search of the google-API', function() {
  it('should fetch an imageURL-string for a noun...', (done) => {
    imagesearch_module.single_url_search('cat').then(result => {
      expect(result).to.be.a('string');
    }).finally(done);
  });
});

/*
//test async-await Promise
describe('single-url-search of the google-API', function() {
  it('should fetch an imageURL-string for a noun...', async () => {
    let result = await imagesearch_module.single_url_search('cat');
    expect(result).to.be.a('string');
  });
});
*/
