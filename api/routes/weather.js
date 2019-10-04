'use strict';

const router = require('express').Router();
// const knex = require('../config/knex');

router.get('/', (req, res) => {
    return res.json({message: 'here is my weather api'});
});

module.exports = router;