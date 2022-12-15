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
  const dewpoint = w['outside_temp_f'] - ((100 - w['humidity']) * (9/25));
  const heater_status = w['heater_status'] == "on" ? 1 : 0;
  const outsideTemp = `# HELP cpu_temp Current CPU temperature.
# TYPE cpu_temp gauge
cpu_temp ${w['CPU']}
# HELP humidity Current Humidity.
# TYPE humidity gauge
humidity ${w['humidity']}
# HELP dewpoint Current dewpoint.
# TYPE humidity gauge
dewpoint ${dewpoint}
# HELP heater_temp_f.
# TYPE heater_temp_f gauge
heater_temp_f ${w['heater_temp_f']}
# HELP heater_temp_c.
# TYPE heater_temp_c gauge
heater_temp_c ${w['heater_temp_c']}
# HELP heater_status.
# TYPE heater_status gauge
heater_status ${heater_status}
# HELP inside_temp_f.
# TYPE inside_temp_f gauge
inside_temp_f ${w['inside_temp_f']}
# HELP outside_temp_f.
# TYPE outside_temp_f gauge
outside_temp_f ${w['outside_temp_f']}`
  return res.format ({
    'text/plain': function() {
      res.send(outsideTemp);
    }
  });
});

module.exports = router;
