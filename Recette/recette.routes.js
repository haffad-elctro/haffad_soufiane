const express = require('express');
const router = express.Router();
const Recette = require('./recette');


router.get('/all', async (req, res) => {
  try {
    const recettes = await Recette.find();
    res.json(recettes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/add', async (req, res) => {
  const { libelle } = req.body;

  

  const recette = new Recette({
    libelle
  });

  try {
    const savedRecette = await recette.save();
    res.json({ message: 'Recette ajoutée avec succès', recette: savedRecette });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put('/update/:name', async (req, res) => {
  const { name } = req.params;
  const { libelle } = req.body;

  try {
    const updatedRecette = await Recette.findOneAndUpdate({ libelle: name }, { $set: { libelle } }, { new: true });

    if (!updatedRecette) {
      return res.status(404).json({ error: 'Recette introuvable' });
    }

    res.json({ message: 'Recette modifiée avec succès', recette: updatedRecette });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/delete/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const deletedRecette = await Recette.findOneAndDelete({ libelle: name });

    if (!deletedRecette) {
      return res.status(404).json({ error: 'Recette introuvable' });
    }

    res.json({ message: 'Recette supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
