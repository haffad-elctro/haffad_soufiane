const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: String,
    specialty: String,
});

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;