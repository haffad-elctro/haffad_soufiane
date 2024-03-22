const express = require('express');
const router = express.Router();
const Restaurant = require('./restaurant');
const Chef = require('./chef');
const Recette = require('./recette');


router.get('/all', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('chef_id').populate('recette_id');
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/chefs/:restaurantname', async (req, res) => {
  const { restaurantname } = req.params;

  try {
    const restaurant = await Restaurant.findOne({ nom: restaurantname }).populate('chef_id');

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant introuvable' });
    }

    res.json(restaurant.chef_id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/recettes/:restaurantname', async (req, res) => {
  const { restaurantname } = req.params;

  try {
    const restaurant = await Restaurant.findOne({ nom: restaurantname }).populate('recette_id');

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant introuvable' });
    }

    
    res.json(restaurant.recette_id); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
