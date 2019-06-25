const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    
})


module.exports = app => app.use('/projects', router);