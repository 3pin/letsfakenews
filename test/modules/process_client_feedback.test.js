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
  it('should take a string, create timestamp => return in a jsonOBJ', (done) => {
    process_client_feedback.process('great').then((result) => {
      debug(result);
      expect(result.feedback).to.equal('great');
      done();
    });
  });
});
