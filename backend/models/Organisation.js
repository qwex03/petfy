const mongoose = require('mongoose');

const OrganisationSchema = new mongoose.Schema({
    siret: {
      type: String,
      required: true, 
    },
    nom: {
      type: String,
      required: true, 
    },
    date: {
      type: Date,
      required: true,
    },
    animals: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Animal' 
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
  });

module.exports = mongoose.model('Organisation', OrganisationSchema);
