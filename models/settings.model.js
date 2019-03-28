const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Base = require('./base.model');

let SettingsSchema = new Schema({
  entry_to_read: {
    type: Number
  },
  autolive: {
    type: Boolean
  },
  activelist: {
    type: Array
  },
  db_mode: {
    type: String
  },
  createDB: {
    type: Boolean
  }
}, {
  collection: process.env.DATABASE
});

// Export the model
module.exports = Base.discriminator('Settings', SettingsSchema, );
