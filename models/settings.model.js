const mongoose = require('mongoose');

const { Schema } = mongoose;
const Base = require('./base.model');

const SettingsSchema = new Schema({
  imageDuration: {
    type: Number,
    required: true,
  },
  textScrollers: {
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
  nodeMode: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

// Export the model
module.exports = Base.discriminator('Settings', SettingsSchema);
