const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get Response')
})

router.post('/', (req, res) => {
    res.send('Post Response')
})

module.exports = router;