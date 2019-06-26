const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();



app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controller/authController')(app);
require('./app/controller/projectController')(app);

app.listen(4000); 