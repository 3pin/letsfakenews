// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests');

// load assertion library
const chai = require('chai');

const {
  expect,
} = chai;

const processStory = require('../../modules/processStory.js');
const processClientStory = require('../../modules/processClientStory.js');
const processClientFeedback = require('../../modules/processClientFeedback.js');

describe('Processing: user_input -> OBJ ready for saving to db', () => {
  it('from string... fetch urls', (done) => {
    const story = 'Pump up the volume';
    processStory.process(story).then((result) => {
      debug(result);
      expect(result).to.be.an('array');
      done();
    }).catch((err) => {
      debug('Failed!', err);
    });
  });
  it('from JSON... add urls & timestamp', (done) => {
    const clientJSON = {
      title: 'MUSIC',
      story: 'Pump up the volume',
    };
    processClientStory.process(clientJSON).then((result) => {
      debug(result);
      expect(result).to.have.property('time');
      expect(result).to.have.property('words');
      expect(result).to.have.property('urls');
      expect(result).to.have.property('wordsTitle');
      expect(result).to.have.property('urlsTitle');
      done();
    }).catch((err) => {
      debug('Failed!', err);
    });
  });
  it('from string... add timestamp', (done) => {
    const feedbackJSON = {
      feedback: 'great',
    };
    processClientFeedback.process(feedbackJSON).then((result) => {
      debug(result);
      expect(result.feedback).to.equal('great');
      done();
    }).catch((err) => {
      debug('Failed!', err);
    });
  });
});
