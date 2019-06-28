const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/bibliotecaDB', { useMongoClient: true });
//mongoose.connect('mongodb+srv://deploy:<password>@cluster0-seyff.mongodb.net/test?retryWrites=true&w=majority', { useMongoClient: true });
mongoose.Promise = global.Promise;
//const connection = mongoose.connection;


module.exports = mongoose;


