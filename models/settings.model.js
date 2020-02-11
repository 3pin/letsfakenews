const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Base = require('./base.model');

let SettingsSchema = new Schema({
  image_duration: {
    type: Number,
    required: true
  },
  text_scrollers: {
    type: Number,
    required: true
  },
  entry_to_read: {
    type: Number,
    required: true
  },
  visualise: {
    type: Number,
    required: true
  },
  autolive: {
    type: Boolean,
    required: true
  },
  activelist: {
    type: Array,
    required: true
  },
  db_mode: {
    type: String,
    required: true
  },
  node_mode: {
    type: String,
    required: true
  }
}, {
  collection: process.env.DATABASE
});

// Export the model
module.exports = Base.discriminator('Settings', SettingsSchema);
