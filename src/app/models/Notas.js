const mongoose = require('../../database'); // Erase if already required

// Declare the Schema of the Mongo model
var NotasSchema = new mongoose.Schema({
    nota: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    livro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livros',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
});


//Export the model
const Notas = mongoose.model('Notas', NotasSchema);

module.exports = Notas;