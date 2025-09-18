const express = require('express');
const router = express.Router();
const Orga = require('../models/Organisation'); 
const Animal = require('../models/Animal');
const User = require('../models/User');

router.post('/create', async (req, res) => {
  try {
    const { siret, nom, date, userId } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const newOrganisation = new Orga({
      siret,
      nom,
      date,
      user: user._id, 
    });

    const savedOrganisation = await newOrganisation.save();
    return res.status(201).json(savedOrganisation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur lors de la création de l\'organisation' });
  }
});

router.get('/:siret', async (req, res) => {
  try {
    const { siret } = req.params;

    const organisation = await Orga.findOne({ siret });
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation non trouvée' });
    }
    return res.status(200).json(organisation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur lors de la récupération de l\'organisation' });
  }
});


router.post('/add-animal/:userId', async (req, res) => {
  try {
    const { userId } = req.params;  
    const { animal } = req.body;

    
    const organisation = await Orga.findOne({ user: userId });
    if (!organisation) {
      return res.status(404).json({ message: 'Aucune organisation trouvée pour cet utilisateur.' });
    }

    const newAnimal = new Animal({
      animalType: req.body.animalType,
      gender: req.body.gender,
      euthanasia: req.body.euthanasia,
      preferences: req.body.preferences,
      name: req.body.name,
      animalAge: req.body.animalAge,
      description: req.body.description,
      imageUrl: req.body.imageUrl,  
    });

    const savedAnimal = await newAnimal.save();

    organisation.animals.push(savedAnimal._id);
    await organisation.save();

    return res.status(201).json({ message: 'Animal ajouté avec succès', animal: savedAnimal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'animal.' });
  }
});

router.get('/:siret/animals', async (req, res) => {
  try {
    const { siret } = req.params;

    const organisation = await Orga.findOne({ siret }).populate('animals');
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation non trouvée' });
    }

    return res.status(200).json(organisation.animals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur lors de la récupération des animaux.' });
  }
});


router.get('/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;  

    if (!userId) {
      return res.status(400).json({ message: 'userId requis' });
    }

    const organisation = await Orga.findOne({ user: userId }).populate('animals', 'name imageUrl');
    
    if (!organisation) {
      console.log("Aucune organisation trouvée pour cet userId"); 
      return res.status(404).json({ message: "Organisation non trouvée" });
    }

    res.status(200).json({
      organisationName: organisation.nom,
      animals: organisation.animals,
    });
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);  
    res.status(500).json({ message: 'Erreur lors du chargement des données' });
  }
});

router.get('/user/:userId/animals-liked', async (req, res) => {
  try {
    const userId = req.params.userId;

    const organisation = await Orga.findOne({ user: userId }).populate('animals');
    if (!organisation) {
      return res.status(404).json({ message: 'Aucune organisation trouvée pour cet utilisateur' });
    }

    const animals = organisation.animals;

    const likedAnimals = animals.filter(animal => animal.likes.includes(userId));

    res.status(200).json(likedAnimals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

