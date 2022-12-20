'use strict';

const router = require('express').Router();
const redis = require("redis");
const { getNoaaWeather } = require('../utils/db');

router.get('/', async (req, res) => {
    const [w] = await Promise.all([
        getNoaaWeather()
    ]);
    return res.json(w);
});

module.exports = router;
