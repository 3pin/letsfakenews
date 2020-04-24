const mongoose = require('mongoose');

const { Schema } = mongoose;

const BaseSchema = new Schema({}, {
  discriminatorKey: '__type',
  collection: global.config.database,
});

// Export the model
module.exports = mongoose.model('Base', BaseSchema);
