const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controller/authController')(app);
require('./controller/projectController')(app);

app.listen(4000);