"use strict";

// load the ENVIRONMENT variables
require("dotenv").config();
const debug = require("debug")("tests");
// load assertion library
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();
// db-connection
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
let activelist = [];

before((done) => {
  mongoose.connect(process.env.MONGODB_URI_TESTS, options);
  mongoose.connection.once("open", () => {
    console.log("Connected for Testing!");
    done();
  }).on("error", error => {
    console.warn("Error : ", error);
  });
});
after((done) => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

describe("Refresh the urls in one story", () => {
  const refresh_save_urls = require("../../modules/refresh_save_urls.js");
  before((done) => {
    let story;
    story = new Story({
      story: "The week includes the days Thursday and Friday",
      title: "The Week",
      time: "11:24:41",
      storylive: true,
      words: ["thursday", "friday"],
      urls: [
        "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg",
        "https://www.premiumwishes.com/wp-content/uploads/2018/01/16-1.jpg"
      ]
    });
    story.save().then(() => done());
  });
  after(() => {
    mongoose.connection.collections.testing.drop();
  });
  it("fetch nouns from Obj...match nouns with urls...update Obj...update Database", done => {
    debug('boom');
    Story.find({}).then(story => {
      refresh_save_urls
        .process(story)
        .then((res) => {
          //expect.strictEqual(res.nModified, 1);
          expect(res.nModified).to.equal(1);
          done();
        })
    });
  });
});
