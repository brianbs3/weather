'use strict';

const router = require('express').Router();
const redis = require("redis");
const knex = require('../config/knex');
const moment = require('moment');
const { setPicoTemp, updatePico } = require('../utils/db');
const { getPicoReadings } = require('../utils/mysql');

router.get('/',  (req, res) => {
  
  return res.json({endpoint: 'pico'});
});

router.get('/metrics', async (req, res) => {
  const fiveMinutesAgo = moment().subtract(5, 'minutes').format('YYYY-MM-DD HH:mm:ss')
  
  const [w] = await Promise.all([
    getPicoReadings(fiveMinutesAgo)
  ]); 
  
  let temp_f = `#HELP temperature in F
#TYPE temp_f gauge
`;
  Object.keys(w).forEach((k) => {
    temp_f += `temp_f{alias="${w[k].location}"} ${w[k].temp_f}
`
  })
  let humidity = `#HELP humidity
#TYPE humidity gauge
`;
  Object.keys(w).forEach((k) => {
    humidity += `humidity{alias="${w[k].location}"} ${w[k].humidity}
`
  })
  let dewpoint = `#HELP dewpoint
#TYPE dewpoint gauge
`;
    Object.keys(w).forEach((k) => {
      const dp = w[k].temp_f - ((100 - w[k].humidity) * (9/25));
      dewpoint += `dewpoint{alias="${w[k].location}"} ${dp}
`
    })
  
  const metrics = `${temp_f}${humidity}${dewpoint}`
  
  return res.format ({
    'text/plain': function() {
      res.send(metrics);
    }
  });

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
    const id = (m.length > 0) ? m[0].id : "";
    
    const data = {
      id: id,
      mac: mac,
      ip: ip,
      hostname: host,
      location: location,
      temp_c: temp_c,
      temp_f: temp_f,
      humidity: humidity,
      updated: ts
    }
    console.log(data)
    const [w] = await Promise.all([
      updatePico(data)
    ]); 
    
    const r = await setPicoTemp(host, humidity, temp_c, temp_f, ts);
    data.redisStatus = r;
    res.json(data)
});


module.exports = router;