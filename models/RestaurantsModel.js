
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
});

const RestaurantsModel = mongoose.model('Restaurant', restaurantSchema);

module.exports = RestaurantsModel;