// load assertion library
const chai = require('chai');

const {
  expect,
} = chai;

// load the ENVIRONMENT variables
require('dotenv').config();
const debug = require('debug')('tests');

debug('hello');

const processStory = require('../../modules/processStory.js');
const processClientStory = require('../../modules/processClientStory.js');
const processClientFeedback = require('../../modules/processClientFeedback.js');

describe('Processing: user_input -> OBJ ready for saving to db', () => {
  it('from string... fetch urls', (done) => {
    const story = 'Pump up the volume DJ John';
    processStory.process(story).then((result) => {
      debug(result);
      expect(result).to.be.an('array');
    }).then(() => {
      done();
    }).catch((err) => {
      debug('Failed!', err);
    });
  });
  it('from JSON... add urls & timestamp', (done) => {
    const clientJSON = {
      title: 'MUSIC',
      story: 'Pump up the volume DJ',
    };
    processClientStory.process(clientJSON).then((result) => {
      debug(result);
      expect(result).to.have.property('time');
      expect(result).to.have.property('words');
      expect(result).to.have.property('urls');
      expect(result).to.have.property('wordsTitle');
      expect(result).to.have.property('urlsTitle');
    }).then(() => {
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
    }).then(() => {
      done();
    }).catch((err) => {
      debug('Failed!', err);
    });
  });
});
