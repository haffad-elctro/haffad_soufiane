const express = require('express');
const router = express.Router();
const Chef = require('./chef');


router.get('/all', async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/add', async (req, res) => {
  const { nom, specialite } = req.body;



  const chef = new Chef({
    nom,
    specialite
  });

  try {
    const savedChef = await chef.save();
    res.json({ message: 'Chef ajouté avec succès', chef: savedChef });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put('/update/:name', async (req, res) => {
  const { name } = req.params;
  const { nom, specialite } = req.body;

 
  try {
    const updatedChef = await Chef.findOneAndUpdate({ nom: name }, { $set: { nom, specialite } }, { new: true });

    if (!updatedChef) {
      return res.status(404).json({ error: 'Chef introuvable' });
    }

    res.json({ message: 'Chef modifié avec succès', chef: updatedChef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/delete/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const deletedChef = await Chef.findOneAndDelete({ nom });

    if (!deletedChef) {
      return res.status(404).json({ error: 'Chef introuvable' });
    }

    res.json({ message: 'Chef supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
