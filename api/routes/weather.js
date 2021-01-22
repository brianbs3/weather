'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
    return res.json({message: 'temperature endpoint'});
});

module.exports = router;
