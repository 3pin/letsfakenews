const mongoose = require('mongoose');

const { Schema } = mongoose;

const BaseSchema = new Schema({}, {
  discriminatorKey: '__type',
  collection: global.gConfig.database,
});

// Export the model
module.exports = mongoose.model('Base', BaseSchema);
