'use strict';

const router = require('express').Router();
const redis = require("redis");
const {getRedisWeather} = require('../utils/db');

router.get('/', async (req, res) => {
  const [w] = await Promise.all([
    getRedisWeather()
  ]);
  return res.json(w);
  // let memcached = new Memcached('localhost:11211', {retries:10,retry:10000,remove:true});
  // let weather = memcached.get('shopWeather1_weather', function(err, data){
  //   if(!err){
  //     return res.json(JSON.parse(data));
  //   }
  //   else{
  //     return res.json({message: 'we got here, so there was an error getting from memcache...'});
  //   }
  // });
});

module.exports = router;
