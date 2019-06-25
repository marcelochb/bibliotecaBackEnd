const mongoose = require('../database'); // Erase if already required
const bcrypt = require('bcryptjs');

// Declare the Schema of the Mongo model
var UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        unique: true,
        select: false,
    },
    administrador: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
})

//Export the model
const User = mongoose.model('User', UserSchema);

module.exports = User;