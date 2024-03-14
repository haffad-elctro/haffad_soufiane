// recette.js
const express = require('express');
const router = express.Router();
const RecettesModel = require('../models/RecettesModel');

router.post('/', async (req, res) => {
    const recette = new RecettesModel({
        name: req.body.name,
    });
    try {
        const newrecette = await recette.save(); 
        res.status(201).json(newrecette);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const recettes = await RecettesModel.find();
        res.json(recettes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.patch('/:name', async (req, res) => {
    try {
        const recette = await RecettesModel.findById(req.params.name);
        if (!recette) {
            return res.status(404).json({ message: 'Recette not found' });
        }
        if (req.body.name != null) {
            recette.name = req.body.name;
        }
        const updatedRecette = await recette.save();
        res.json(updatedRecette);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:name', async (req, res) => {
    try {
        const recette = await RecettesModel.find(req.params.name);
        if (!recette) {
            return res.status(404).json({ message: 'Recette not found' });
        }
        await recette.remove();
        res.json({ message: 'Recette deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
