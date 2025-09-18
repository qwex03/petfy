const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

router.get('/:id', async(req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await Animal.findById(animalId);
        
        if(!animal) {
            return res.status(404).json({ message: "Animal nom trouvé "});
        }

        res.status(200).json({ message: "Animal trouvé", animal})
    } catch (error) {
        res.status(500).json({message: "Erreur serveur", error})
    }
})

router.post('/like/:animalId', async(req, res) => {
    try {
        const userId = req.body.userId;
        const animalId = req.params.animalId;

        const animal = await Animal.findById(animalId);
        if(!animal) {
            return res.status(404).json({ message: "Animal non trouvé "});
        }

        animal.likes.push(userId);
        await animal.save();
        res.status(200).json({ message: "Animal liké avec succès", animal});
    } catch (error) {
        res.status(500).json({message: "Erreur serveur", error})
    }
})


router.post('/dislike/:animalId', async(req, res) => {
    try {
        const userId = req.body.userId;
        const animalId = req.params.animalId;

        const animal = await Animal.findById(animalId);
        if(!animal) {
            return res.status(404).json({ message: "Animal non trouvé "});
        }

        animal.dislikes.push(userId);
        await animal.save();
        res.status(200).json({ message: "Animal disliké avec succès", animal});
    } catch (error) {
        res.status(500).json({message: "Erreur serveur", error})
    }
})


module.exports = router;
