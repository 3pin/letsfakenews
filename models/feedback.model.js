const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FeedbackSchema = new Schema({
  type: {
    type: String,
    required: true
  },
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
module.exports = mongoose.model('Feedback', FeedbackSchema);
