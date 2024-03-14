// restaurant.js
const express = require('express');
const router = express.Router();
const RestaurantsModel = require('../models/RestaurantsModel');

router.get('/all', async (req, res) => {
    try {
        const restaurants = await RestaurantsModel.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const restaurant = new RestaurantsModel({
        name: req.body.name,
    });
    try {
        const newRestaurant = await restaurant.save(); 
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:name', async (req, res) => {
    try {
        const restaurant = await RestaurantsModel.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true }
        );
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:name', async (req, res) => {
    try {
        const restaurant = await RestaurantsModel.findOneAndDelete({ name: req.params.name });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json({ message: 'Restaurant deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
