const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);