const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();




app.use(function (req, res, next) {


    res.setHeader('Access-Control-Allow-Origin', '*');


    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require('./app/controller/authController')(app);
require('./app/controller/projectController')(app);

app.listen(process.env.PORT || 4000); 