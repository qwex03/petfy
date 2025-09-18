const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Animal = require('../models/Animal');

router.post('/preferences/:id', async (req, res) => { 
    try {
        const userId = req.params.id;
        const { preferences, birth, distance, gender, animalType, euthanasia, UserGender } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        if (!preferences || !birth || !distance || !gender || !animalType || !euthanasia || !UserGender) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        user.research.preferences = preferences;
        user.research.birth = birth;
        user.research.distance = distance;
        user.research.gender = gender;
        user.research.animalType = animalType;
        user.research.euthanasia = euthanasia;
        user.research.UserGender = UserGender;

        await user.save();

        res.status(200).json({ message: "Préférences mises à jour avec succès", user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

router.get('/unrated-animals/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const unratedAnimals = await Animal.find({
      $and: [
        { likes: { $ne: userId } },  
        { dislikes: { $ne: userId } } 
      ]
    });

    if (!unratedAnimals.length) {
      return res.status(404).json({ message: 'Aucun animal non évalué trouvé pour cet utilisateur.' });
    }

    res.status(200).json(unratedAnimals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des animaux non évalués.' });
  }
});

router.get('/liked-animals/:userId', async(req, res) => {
  const { userId } = req.params;

  try {
    likedAnimals = await Animal.find({ likes: userId });
    if(!likedAnimals.length) {
      return res.status(404).json({message: "Aucun animal liké trouvé pour cette user"});
    } 

    res.status(200).json(likedAnimals);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Erreur lors de la récupérations des données"})
  }
})




module.exports = router;