const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { animated } = require('@react-spring/web');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: { type: String, enum: ['adoptant', 'organisme']},
    research : {
        preferences: {
            dog: { type: Boolean, default: false },
            cat: { type: Boolean, default: false },
            kids: { type: Boolean, default: false },
            others: { type: Boolean, default: false }
        },
        birth: {type: String, required: false},
        distance: {type: Number, required: false},
        gender: {type: String, required: false},
        animalType: {type: String, required: false},
        euthanasia: {type: String, required: false},
        UserGender: {type: String, required: false},
    },
});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema)