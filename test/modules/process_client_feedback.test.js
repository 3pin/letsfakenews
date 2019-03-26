'use strict';

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests');

// load assertion library
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

const process_client_feedback = require('../../modules/process_client_feedback.js');

describe('testing function to prepare JSON obj for submission to db as feedback...', () => {
  it('should take a JSON with feedback, add a timestamp => return JSON', (done) => {
    let feedback_JSON = {
      feedback: "great"
    };
    process_client_feedback.process(feedback_JSON).then((result) => {
      debug(result);
      expect(result.feedback).to.equal('great');
      done();
    });
  });
});
