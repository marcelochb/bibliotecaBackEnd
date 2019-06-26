const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/bibliotecaDB', { useMongoClient: true });
mongoose.Promise = global.Promise;
//const connection = mongoose.connection;


module.exports = mongoose;


