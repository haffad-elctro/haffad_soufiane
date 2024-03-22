const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Utilisateur = require('./utilisateur');


router.post('/register', async (req, res) => {
  const { nom, email, login, mdp } = req.body;

  

  if (!nom || !email || !login || !mdp) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }


  const utilisateurExistant = await Utilisateur.findOne({ email });
  if (utilisateurExistant) {
    return res.status(400).json({ message: 'Lutilisateur existe déjà.' });
  }



  const salt = await bcrypt.genSalt(10);
  const hachageMdp = await bcrypt.hash(mdp, salt);


  const utilisateur = new Utilisateur({
    nom,
    email,
    login,
    mdp: hachageMdp,
  });

  await utilisateur.save();



  const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(201).json({
    message: 'Utilisateur enregistré avec succès.',
    token,
  });
});


router.post('/login', async (req, res) => {
  const { login, mdp } = req.body;



  if (!login || !mdp) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }


  const utilisateur = await Utilisateur.findOne({ login });
  if (!utilisateur) {
    return res.status(404).json({ message: 'Utilisateur non trouvé.' });
  }



  const isMdpCorrect = await bcrypt.compare(mdp, utilisateur.mdp);
  if (!isMdpCorrect) {
    return res.status(401).json({ message: 'Mot de passe incorrect.' });
  }



  const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({
    message: 'Connexion réussie.',
    token,
  });
});

module.exports = router;
