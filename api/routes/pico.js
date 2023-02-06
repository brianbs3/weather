'use strict';

const router = require('express').Router();
const redis = require("redis");
const knex = require('../config/knex');
const moment = require('moment');
const { setPicoTemp } = require('../utils/db');

router.get('/',  (req, res) => {
  
  return res.json({endpoint: 'pico'});
});

router.post('/', async function(req, res) {
    const mac = req.body.mac || req.query.mac;
    const onboard_temp = req.body.onboard_temp || req.query.onboard_temp;
    const humidity = req.body.humidity || req.query.humidity;
    const humidity_temp = req.body.humidity_temp || req.query.humidity_temp;
    const ts = moment().format('YYYY-MM-DD HH:mm:ss')
    const m = await knex.select()
        .from('pico')
        .where('mac', mac)
    console.log(m);
    const host = m[0].hostname || "";
    const location = m[0].location || "";
    const data = {
      mac: mac,
      hostname: host,
      location: location,
      onboard_temp: onboard_temp,
      humidity: humidity,
      humidity_temp: humidity_temp,
      ts: ts
    }
    console.log(data)
    
    const r = await setPicoTemp(host, onboard_temp, humidity, humidity_temp, ts);
    
    res.json(r)
});


module.exports = router;