const mongoose = require('mongoose');

const RecetteSchema = new mongoose.Schema({
  libelle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Recette', RecetteSchema);