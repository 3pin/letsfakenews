const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StorySchema = new Schema({
    title: {type: String, required: true, max: 25},
    story: {type: String, required: true, max: 280},
    time: {type: String, required: true},
    storylive: {type: Boolean, required: true},
    words: Array,
    urls: Array
});


// Export the model
module.exports = mongoose.model('Story', StorySchema);
