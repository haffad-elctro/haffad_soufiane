const express = require('express');
const router = express.Router();
const Chef = require('../models/ChefsModel');

router.get('/', async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.json(chefs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const chef = new Chef({
        name: req.body.name,
        specialty: req.body.specialty
    });
    try {
        const newChef = await chef.save();
        res.status(201).json(newChef);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }
        await chef.remove();
        res.json({ message: 'Chef deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }
        if (req.body.name != null) {
            chef.name = req.body.name;
        }
        if (req.body.specialty != null) {
            chef.specialty = req.body.specialty;
        }
        const updatedChef = await chef.save();
        res.json(updatedChef);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
