/*
//load .env variables
const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({
  path: dotEnvPath
});
*/

/*
// check the env
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  const dotEnvPath = path.resolve('./.env');
  const result = dotenv.config({ path: dotEnvPath})
  if (result.error) {
    throw result.parsed
  }
}

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const db_module = require('../modules/db_module.js');

describe('save JSON to db: {story:string, title:string, time:string, words:array, urls: array', function() {
  it('db.collection.count() should increment if JSON-save was successful', function() {
    let client_JSON = {
      title: 'MUSIC'
      story: 'Pump up the volume',
      words: [ 'Pump', 'volume' ],
      urls: [ 'https://i.ytimg.com/vi/BaEHVpKc-1Q/maxresdefault.jpg', 'http://www.k6-geometric-shapes.com/images/ws-t2-volume.jpg' ] }
    }
    //
    let result
    expect(result.to.be.boolean)
    // various lines of setup
    //expect('bla').to.be.()
    //bla.should.be.equal(2)
  })
});

*/
