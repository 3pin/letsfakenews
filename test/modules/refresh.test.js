"use strict";

// load the ENVIRONMENT variables
require("dotenv").config();
const debug = require("debug")("tests");

// load assertion library
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();

// db-setup
const mongoose = require("mongoose");
const Story = require("../../models/story.model");
const options = {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  promiseLibrary: Promise,
  useFindAndModify: false,
  useUnifiedTopology: true
};
describe("Refresh: refreshing urls for stories", () => {
  before((done) => {
    mongoose.connect(process.env.MONGODB_URI_TESTS, options);
    mongoose.connection.once("open", () => {
      debug("db-connected");
      done();
    }).on("error", error => {
      console.warn("Error : ", error);
    });
  });
  after(() => {
    mongoose.connection.close(() => {
      debug("db-disconnected");
      process.exit(0);
    })
  });
  beforeEach((done) => {
    let story1 = new Story({
      story: "Let's talk about Thursday and Friday",
      title: "Thursday & Friday",
      time: "11:24:41",
      storylive: true,
      words: ["Thursday", "Friday"],
      urls: [
        "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg",
        "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg"
      ]
    });
    let story2 = story1;
    story1.save().then(() => {
      story2.save().then(() => {
        done();
      }).catch(function (error) {
        debug("Failed!", error);
      });
    });
  });
  afterEach(() => {
    mongoose.connection.collections.testing.drop();
  });
  it("refresh the urls in 1 story", done => {
    const refresh_urls = require("../../modules/refresh_urls.js");
    Story.find({}).then((obj) => {
      debug(obj);
      refresh_urls.process(obj[0]).then(result => {
        expect(result.urls.length).to.equal(obj[0].words.length);
        done();
      }).catch(function (error) {
        debug("Failed!", error);
      })
    })
  });
  it('refresh the urls in multiple stories', (done) => {
    const refresh_urls_iterative = require('../../modules/refresh_urls_iterative.js');
    Story.find({}).then((objects) => {
      refresh_urls_iterative.process(objects).then(result => {
        expect(result.length).to.equal(objects.length);
        done();
      }).catch(function (error) {
        debug("Failed!", error);
      })
    })
  });
  it("refresh & save the urls for 1 story", done => {
    const refresh_save_urls = require("../../modules/refresh_save_urls.js");
    Story.find({}).then((stories) => {
      debug(stories);
      refresh_save_urls.process(stories[0]._id)
        .then((res) => {
          expect(res.nModified).to.equal(1);
          done();
        })
    });
  });
  it("refresh & save the urls for multiple stories", done => {
    const refresh_save_urls_iterative = require("../../modules/refresh_save_urls_iterative.js");
    refresh_save_urls_iterative.process()
      .then((res) => {
        for (const entry of res) {
          expect(entry.nModified).to.equal(1);
        }
      }).then(() => {
        done();
      });
  });
});
