const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  type: {
    type: String,
    required: true
  },
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
module.exports = mongoose.model('User', UserSchema);
