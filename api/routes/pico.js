'use strict';

const router = require('express').Router();
const redis = require("redis");
const knex = require('../config/knex');
const moment = require('moment');
const { setPicoTemp, updatePico, c2f } = require('../utils/db');
const { getPicoReadings } = require('../utils/mysql');

router.get('/',  async (req, res) => {
  const pico = await knex.select()
    .from('pico');
    
  return res.json(pico);
});

router.get('/metrics', async (req, res) => {
  const fiveMinutesAgo = moment().subtract(5, 'minutes').format('YYYY-MM-DD HH:mm:ss')
  
  const [w] = await Promise.all([
    getPicoReadings(fiveMinutesAgo)
  ]); 
  
  let onewire_temp_f = `#HELP temperature in F
#TYPE onewire_temp_f gauge
`;
  Object.keys(w).forEach((k) => {
    onewire_temp_f += `onewire_temp_f{alias="${w[k].location}"} ${c2f(w[k].onewire_temp_c)}
`
  })
  let onboard_temp_f = `#HELP temperature in F
#TYPE onboard_temp_f gauge
`;
  Object.keys(w).forEach((k) => {
    onboard_temp_f += `onboard_temp_f{alias="${w[k].location}"} ${c2f(w[k].onboard_temp_c)}
`
  })
  let humidity_temp_f = `#HELP temperature in F
#TYPE humidity_temp_f gauge
`;
  Object.keys(w).forEach((k) => {
    humidity_temp_f += `humidity_temp_f{alias="${w[k].location}"} ${c2f(w[k].humidity_temp_c)}
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
      const dp = c2f(w[k].onewire_temp_c) - ((100 - w[k].humidity) * (9/25));
      dewpoint += `dewpoint{alias="${w[k].location}"} ${dp}
`
    })
  
  const metrics = `${humidity}${dewpoint}${onewire_temp_f}${humidity_temp_f}${onboard_temp_f}`
  
  return res.format ({
    'text/plain': function() {
      res.send(metrics);
    }
  });

});

router.post('/', async function(req, res) {
  const {mac, ip, version, humidity, onewire_temp_c, humidity_temp_c, onboard_temp_c} = req.body;
    
    const ts = moment.utc().local().format('YYYY-MM-DD HH:mm:ss');
    const m = await knex.select()
        .from('pico')
        .where('mac', mac)
  
    const location = (m.length > 0) ? m[0].location : "";
    const host = (m.length > 0) ? m[0].hostname : "";
    const id = (m.length > 0) ? m[0].id : "";
    const poll_interval = (m.length > 0) ? m[0].poll_interval : "";
    
    const data = {
      id: id,
      mac: mac,
      ip: ip,
      hostname: host,
      location: location,
      onewire_temp_c: onewire_temp_c,
      onboard_temp_c: onboard_temp_c,
      humidity_temp_c: humidity_temp_c,
      humidity: humidity,
      version: version,
      poll_interval: poll_interval,
      updated: ts
    }
    console.log(data)
    const [w] = await Promise.all([
      updatePico(data)
    ]); 
    
    res.json(data)
});


module.exports = router;