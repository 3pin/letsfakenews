const mongoose = require('mongoose');

const { Schema } = mongoose;
const Base = require('./base.model');

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 25,
  },
  story: {
    type: String,
    required: true,
    max: 280,
  },
  storylive: {
    type: Boolean,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  words: Array,
  urls: Array,
  wordsTitle: Array,
  urlsTitle: Array,
}, {
  collection: global.config.database,
});

// Export the model
module.exports = Base.discriminator('Story', StorySchema);
