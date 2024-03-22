const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  specialite: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Chef', ChefSchema);