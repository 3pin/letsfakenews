// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const process_story_module = require('../../modules/process_story_module.js');

describe('When story(string) recevied... story-processed to [words] then [urls]', () => {

  it('from story... parse nouns -> fetch urls', (done) => {
    let story = "Pump up the volume"
    process_story_module.process(story).then((result) => {
      expect(result).to.be.an('array');
      done()
    }).catch(function(err) {
      debug("Failed!", err);
    })
  })

});