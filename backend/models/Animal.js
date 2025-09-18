const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  animalType: {
    type: String, 
    required: true
  },
  gender: {
    type: String, 
    required: true
  },
  euthanasia: {
    type: String, 
    required: true
  },
  preferences: {
    dog: { type: Boolean, default: false },
    cat: { type: Boolean, default: false },
    kids: { type: Boolean, default: false },
    others: { type: Boolean, default: false }
  },
  name: {
    type: String, 
    required: true
  },
  animalAge: {
    type: Number, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  imageUrl: {
    type: String, 
    default: ""
  },
  likes: {
    type: Array, 
    default: []
  },
  dislikes: {
    type: Array, 
    default: []
  }
});

 
module.exports = mongoose.model('Animal', AnimalSchema);
;
