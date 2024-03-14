
const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    name: String,
});

const RecettesModel = mongoose.model('Recette', recetteSchema);

module.exports = RecettesModel;