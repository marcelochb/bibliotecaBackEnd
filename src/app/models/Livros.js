const mongoose = require('../../database'); // Erase if already required

// Declare the Schema of the Mongo model
var LivrosSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    editora: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
});


//Export the model
const Livros = mongoose.model('Livros', LivrosSchema);

module.exports = Livros;