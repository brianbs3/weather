'use strict';

const router = require('express').Router();
const redis = require("redis");
const knex = require('../config/knex');
const { getRedisWeather, setHeaterTemp } = require('../utils/db');

router.get('/',  (req, res) => {
  
  return res.json({endpoint: 'pico'});
});

router.post('/', async function(req, res) {
    const mac = req.body.mac || req.query.mac;
    const pass = req.body.password || req.query.password;
    console.log(`mac: ${mac}`)
    const m = await knex.select()
        .from('pico')
        .where('mac', mac)
        .then(
        m => {
            res.json(m);
        }
    );
    // res.json({mac: mac})
});


module.exports = router;