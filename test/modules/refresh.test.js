'use strict'

// load the ENVIRONMENT variables
require('dotenv').config()
const debug = require('debug')('tests')

// load assertion library
const chai = require('chai')
const expect = chai.expect

// db-setup
const mongoose = require('mongoose')
const Story = require('../../models/story.model')
const options = {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  promiseLibrary: Promise,
  useFindAndModify: false,
  useUnifiedTopology: true
}
describe('Refresh: refreshing urls for stories', () => {
  debug('started')
  //
  before((done) => {
    debug('before entered...')
    /* open db connection for tests */
    mongoose.connect(process.env.MONGODB_URI_TESTS, options)
    mongoose.connection.once('open', () => {
      debug('db-connected')
      done()
    }).on('error', error => {
      console.warn('Error : ', error)
    })
  })
  after(() => {
    debug('after entered...')
    /* close db connection */
    mongoose.connection.close(() => {
      debug('db-disconnected')
      // process.exit(0);
    })
  })
  beforeEach((done) => {
    debug('beforeEach entered...')
    /* create 2 db entries */
    const story1 = new Story({
      story: "Let's talk about the week",
      title: 'Monday & Tuesday',
      time: '11:24:41',
      storylive: true,
      words: ['Thursday', 'Friday'],
      urls: [
        'https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg',
        'https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg'
      ]
    })
    const story2 = new Story({
      story: "Let's talk about the weekend",
      title: 'Saturday & Sunday',
      time: '11:24:41',
      storylive: true,
      words: ['Thursday', 'Friday'],
      urls: [
        'https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg',
        'https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg'
      ]
    })
    story1.save().then(() => {
      story2.save().then(() => {
        done()
      }).catch(function (error) {
        debug('Failed!', error)
      })
    })
  })
  afterEach((done) => {
    debug('afterEach entered')
    /* create 2 db entries */
    // mongoose.connection.collections.development.drop();
    /*
    mongoose.connection.collection(process.env.DATABASE, function (err, collection) {
      collection.drop().then(() => {
        debug("collection dropped");
        done();
      });
    })
    */
    mongoose.connection.db.dropCollection(process.env.DATABASE, (result) => {
      debug('Collection dropped')
      done()
    })
  })
  //
  it('refresh the urls in 1 story', (done) => {
    debug('test1 entered')
    const refreshUrls = require('../../modules/refreshUrls.js')
    Story.find({}).then((obj) => {
      refreshUrls.process(obj[0]).then(result => {
        expect(result.urls.length).to.equal(obj[0].words.length)
        done()
      }).catch(function (error) {
        debug('Failed!', error)
      })
    })
  })
  it('refresh the urls in multiple stories', (done) => {
    debug('test2 entered')
    const refreshUrlsIterative = require('../../modules/refreshUrlsIterative.js')
    Story.find({}).then((objects) => {
      refreshUrlsIterative.process(objects).then(result => {
        expect(result.length).to.equal(objects.length)
        done()
      }).catch(function (error) {
        debug('Failed!', error)
      })
    })
  })
  it('refresh & save the urls for 1 story', (done) => {
    debug('test3 entered')
    const refreshSaveUrls = require('../../modules/refreshSaveUrls.js')
    Story.find({}).then((stories) => {
      refreshSaveUrls.process(stories[0]._id)
        .then((res) => {
          expect(res.nModified).to.equal(1)
          done()
        })
    })
  })
  it('refresh & save the urls for multiple stories', (done) => {
    debug('test4 entered')
    const refreshSaveUrlsIterative = require('../../modules/refreshSaveUrlsIterative.js')
    refreshSaveUrlsIterative.process()
      .then((res) => {
        for (const entry of res) {
          expect(entry.nModified).to.equal(1)
        }
      }).then(() => {
        done()
      })
  })
})
