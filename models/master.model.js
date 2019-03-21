const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MasterSchema = new Schema({
  settings: Array,
  users: Array,
  stories: Array,
  feedback: Array
});

// Export the model
module.exports = mongoose.model('Master', MasterSchema);
