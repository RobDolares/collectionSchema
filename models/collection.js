const mongoose = require('mongoose');

// get a reference to Schema
const Schema = mongoose.Schema;

// create a schema for a collection
// At least one non-string field - COMPLETE
// An array
// At least one nested object (can be in array)
const collectionSchema = new Schema({
  description: { type: String, required: true },
  dimensions: {
    width: {type:Number, required: false},
    height: {type:Number, required: false},
    shape: {type: String, required: false}
},
  quantity: { type: Number, required: true},
});

// create a model for a collection
const Sticker = mongoose.model('collection', collectionSchema);

module.exports = Sticker;
