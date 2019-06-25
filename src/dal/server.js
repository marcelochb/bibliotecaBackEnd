const express = require('./node_modules/express');
const app = express();
const bodyParser = require('./node_modules/body-parse');
const cors = require('./node_modules/cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("server connected: " + PORT);
}) 