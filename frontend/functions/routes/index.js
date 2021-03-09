const express = require('express');
const router = express.Router();
const movies = require('./movies')

router.use('/', movies)
    // router.get('/', function(req, res) {
    //     res.send('OK')
    // })

module.exports = router;