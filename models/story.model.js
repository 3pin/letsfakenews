const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Base = require('./base.model');

let StorySchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 25
  },
  story: {
    type: String,
    required: true,
    max: 280
  },
  storylive: {
    type: Boolean,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  words: Array,
  urls: Array,
  words_title: Array,
  urls_title: Array,
}, {
  collection: process.env.DATABASE
});

// Export the model
module.exports = Base.discriminator('Story', StorySchema);
