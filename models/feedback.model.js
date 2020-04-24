const mongoose = require('mongoose');

const { Schema } = mongoose;
const Base = require('./base.model');

const FeedbackSchema = new Schema({
  feedback: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
}, {
  collection: global.config.database,
});

// Export the model
module.exports = Base.discriminator('Feedback', FeedbackSchema);
