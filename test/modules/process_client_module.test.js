// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const process_client_module = require('../../modules/process_client_module.js');

describe('When story(JSON) recevied... story-processed to [words] to [urls] then JSON', function() {
  it('from client-JSON parse nouns -> fetch urls -> calc currenttime -> add client-JSON', (done) => {
    let client_JSON = {
      "title": "MUSIC",
      "story": "Pump up the volume"
    }
    process_client_module.process(client_JSON).then(function(result) {
      expect(client_JSON).to.have.property('urls')
      done()
    }).catch(done)
  })
});
