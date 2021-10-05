'use strict';

const router = require('express').Router();
const Memcached = require('memcached');

router.get('/', (req, res) => {
  try{
    let memcached = new Memcached('localhost:11211', {retries:10,retry:10000,remove:true});
    let weather = memcached.get('shopWeather1_weather', function(err, data){
      if(!err){
        if(data){
          console.log(data);
          const d = JSON.parse(data);
          const hostname = d['hostname'];
          const outsideTemp = `# HELP outside_tem Current temperature outside.
# TYPE outside_temp gauge
outside_temp ${d['F2']}
# HELP inside_tem Current temperature inside.
# TYPE inside_temp gauge
inside_temp ${d['F1']}
# HELP cpu_temp Current CPU temperature.
# TYPE cpu_temp gauge
cpu_temp ${d['CPU']}`
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
      }

      else{
        console.log('no valid data');
      }
    });
  }
  catch(error){
    console.log(new Error('Error getting data'));
    console.log(error);
  }
});

module.exports = router;
