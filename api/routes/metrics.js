'use strict';

const router = require('express').Router();
// const Memcached = require('memcached');
const redis = require("redis");
const {getRedisWeather} = require('../utils/db');

router.get('/', async (req, res) => {
  const [w] = await Promise.all([
    getRedisWeather()
  ]);
  console.log(w);
  const dewpoint = w['F1'] - ((100 - w['humidity']) * (9/25))
  const outsideTemp = `# HELP outside_tem Current temperature outside.
# TYPE outside_temp gauge
outside_temp ${w['F1']}
# HELP inside_tem Current temperature inside.
# TYPE inside_temp gauge
inside_temp ${w['F2']}
# HELP cpu_temp Current CPU temperature.
# TYPE cpu_temp gauge
cpu_temp ${w['CPU']}
# HELP humidity Current Humidity.
# TYPE humidity gauge
cpu_temp ${w['humidity']}
# HELP dewpoint Current dewpoint.
# TYPE humidity gauge
cpu_temp ${dewpoint}`
  return res.format ({
    'text/plain': function() {
      res.send(outsideTemp);
    }
  });
});

module.exports = router;
