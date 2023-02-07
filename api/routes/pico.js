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
    const temp_c = req.body.temp_c || req.query.temp_c;
    const temp_f = req.body.temp_f || req.query.temp_f;
    const humidity = req.body.humidity || req.query.humidity;
    const ip = req.body.ip || req.query.ip;
    const ts = moment.utc().local().format('YYYY-MM-DD HH:mm:ss');
    const m = await knex.select()
        .from('pico')
        .where('mac', mac)
    console.log(m);
    const location = (m.length > 0) ? m[0].location : "";
    const host = (m.length > 0) ? m[0].hostname : "";
    
    const data = {
      mac: mac,
      ip: ip,
      hostname: host,
      location: location,
      temp_c: temp_c,
      temp_f: temp_f,
      humidity: humidity,
      ts: ts
    }
    console.log(data)
    
    const r = await setPicoTemp(host, humidity, temp_c, temp_f, ts);
    data.redisStatus = r;
    res.json(data)
});


module.exports = router;