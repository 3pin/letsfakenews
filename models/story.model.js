const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StorySchema = new Schema({
  type: {
    type: String,
    required: true
  },
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
  urls: Array
}, {
  collection: process.env.DATABASE
});

// Export the model
module.exports = mongoose.model('Story', StorySchema, );
