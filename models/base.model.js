const mongoose = require('mongoose');

const { Schema } = mongoose;

const BaseSchema = new Schema({}, {
  discriminatorKey: '__type',
  collection: process.env.DATABASE,
});

// Export the model
module.exports = mongoose.model('Base', BaseSchema);
