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

const process_story_module = require('../modules/process_story_module.js');

describe('When story(string) recevied... story-processed to [words] then [urls]', function() {
  it('from story... parse nouns -> fetch urls', (done) => {
    let story = "Pump up the volume"
    process_story_module.process(story).then(function(result) {
      expect(result).to.be.an('array');
      done()
    }, function(err) {
      console.log(err)
    }).catch(function(err) {
      console.log("Failed!", err);
    })
  })
});
