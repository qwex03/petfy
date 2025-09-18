const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router();

router.post('/register', async (req, res) => {
    const {email, password, name, tel} = req.body;
    try {
        const user = await User.create({email, password, name});
        const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch {
        res.status(400).json({message: "Erreur lors de la création de l'utilisateur"})
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

router.put('/assign-role/:id', async (req, res) => {
    const { id } = req.params; 
    const { role } = req.body; 
    if (!['adoptant', 'organisme'].includes(role)) {
        return res.status(400).json({ message: "Rôle invalide" });
    }
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true } 
        );
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ message: "Rôle attribué avec succès", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de l'attribution du rôle" });
    }
});

router.put('/change/:id', async (req, res) => {
    const {id} = req.params;
    const {name ,birth} = req.body;

    try {
        if(!name || !birth) {
            return res.status(400).json({message: "Veuillez remplir tous les champs"});
        }

        const updatedUser = await User.findByIdAndUpdate(id, {name, birth}, {new: true, runValidators: true});
        if (!updatedUser) {
            return res.status(404).json({message: "Utilisateur non trouvé"});
        }

        res.status(200).json(updatedUser);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la modification des informations"});
    }
})




module.exports = router;
    