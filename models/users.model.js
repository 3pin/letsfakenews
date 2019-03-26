const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Base = require('./base.model');

let UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: process.env.DATABASE
});

// Export the model
module.exports = Base.discriminator('User', UserSchema);
