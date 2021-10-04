'use strict';

const router = require('express').Router();
const Memcached = require('memcached');

router.get('/', (req, res) => {
  let memcached = new Memcached('localhost:11211', {retries:10,retry:10000,remove:true});
  let weather = memcached.get('shopWeather1_weather', function(err, data){
    if(!err){
      console.log(data);
      const d = JSON.parse(data);
      const outsideTemp = "Outside " + `${d['F1']}`;
      return res.format ({
        'text/plain': function() {
          res.send(outsideTemp);
        }
     });
   //   return res.json(JSON.parse(data));
    }
    else{
      return res.json({message: 'we got here, so there was an error getting from memcache...'});
    }
  });
});

module.exports = router;
