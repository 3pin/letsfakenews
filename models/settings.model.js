const mongoose = require('mongoose');

const { Schema } = mongoose;
const Base = require('./base.model');

const SettingsSchema = new Schema({
  image_duration: {
    type: Number,
    required: true,
  },
  text_scrollers: {
    type: Number,
    required: true,
  },
  entryToRead: {
    type: Number,
    required: true,
  },
  visualise: {
    type: Number,
    required: true,
  },
  autolive: {
    type: Boolean,
    required: true,
  },
  activelist: {
    type: Array,
    required: true,
  },
  dbMode: {
    type: String,
    required: true,
  },
  node_mode: {
    type: String,
    required: true,
  },
}, {
  collection: global.config.database,
});

// Export the model
module.exports = Base.discriminator('Settings', SettingsSchema);
