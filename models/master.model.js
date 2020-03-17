const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MasterSchema = new Schema({
  settings: Array,
  users: Array,
  stories: Array,
  feedback: Array
})

// Export the model
module.exports = mongoose.model('Master', MasterSchema, process.env.DATABASE)
