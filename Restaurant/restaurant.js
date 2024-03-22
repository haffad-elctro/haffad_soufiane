const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  chef_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
    required: true,
  },
  recette_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recette',
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);