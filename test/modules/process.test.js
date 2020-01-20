'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
const process_story = require('../../modules/process_story.js');
const process_client_story = require('../../modules/process_client_story.js');
const process_client_feedback = require('../../modules/process_client_feedback.js');

describe('Processing: user_input -> OBJ ready for saving to db', () => {
  it('from string... fetch urls', (done) => {
    let story = "Pump up the volume"
    process_story.process(story).then((result) => {
      debug(result);
      expect(result).to.be.an('array');
      done()
    }).catch(function (err) {
      debug("Failed!", err);
    })
  })
  it('from JSON... add urls & timestamp', (done) => {
    let client_JSON = {
      "title": "MUSIC",
      "story": "Pump up the volume"
    };
    process_client_story.process(client_JSON).then((result) => {
      debug(result);
      expect(result).to.have.property('urls');
      done();
    }).catch(function (err) {
      debug("Failed!", err);
    })
  });
  it('from string... add timestamp', (done) => {
    let feedback_JSON = {
      feedback: "great"
    };
    process_client_feedback.process(feedback_JSON).then((result) => {
      debug(result);
      expect(result.feedback).to.equal('great');
      done();
    }).catch(function (err) {
      debug("Failed!", err);
    })
  });

});
