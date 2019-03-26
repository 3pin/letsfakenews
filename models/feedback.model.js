const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Base = require('./base.model');

let FeedbackSchema = new Schema({
  feedback: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
}, {
  collection: process.env.DATABASE
});

// Export the model
module.exports = Base.discriminator('Feedback', FeedbackSchema);
