const mongoose = require('mongoose');

app.use(cors());

mongoose.connect('mongodb://localhost:27017/biliotecaDB',{ useMongoClient: true});
mongoose.Promise = global.Promise;
//const connection = mongoose.connection;

connection.once('open', () => {
    console.log("conexao ok");
})

module.exports = mongoose;


