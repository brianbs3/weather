'use strict';

const router = require('express').Router();
const redis = require("redis");
const knex = require('../config/knex');
const { setPicoTemp } = require('../utils/db');

router.get('/',  (req, res) => {
  
  return res.json({endpoint: 'pico'});
});

router.post('/', async function(req, res) {
    const mac = req.body.mac || req.query.mac;
    const temp = req.body.temp || req.query.temp;
    const ts = req.body.ts || req.query.ts;
    console.log(`mac: ${mac}`);
    console.log(`temp: ${temp}`);
    console.log(`ts: ${ts}`);
    const m = await knex.select()
        .from('pico')
        .where('mac', mac)
    const host = m[0].hostname;
    const r = await setPicoTemp(host, temp, ts);
    
    res.json(r)
});


module.exports = router;