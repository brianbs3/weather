const redis = require("redis");
const client = redis.createClient({url: 'redis://localhost:6379'});

const getRedisWeather = async () => {
    return new Promise(async (resolve, reject) => {
        try{
    const client = await redis.createClient({url: 'redis://localhost:6379'});
    let weather;
    client.on("error", function(error) {
      console.error(error);
    });
    await client.multi()
    .get('F1')
    .get('F2')
    .get('CPU')
    .get('timestamp')
    .get('hostname')
    .get('humidity')
    .get('C1')
    .get('heater_temp_f')
    .get('heater_temp_c')
    .get('heater_status')
    .get('inside_temp_f')
    .get('outside_temp_f')
    .exec((err, replies) => {
        console.log(replies);
        resolve(
        {
          F1: replies[0],
          F2: replies[1], 
          CPU: replies[2], 
          TIMESTAMP: replies[3], 
          hostname: replies[4], 
          humidity: replies[5], 
          C1: replies[6],
          heater_temp_f: replies[7],
          heater_temp_c: replies[8],
          heater_status: replies[9],
          inside_temp_f: replies[10],
          outside_temp_f: replies[11]
        });
    });
  }
  catch(error){
    console.log(error);
  }
    });
}

module.exports = {
    getRedisWeather
};
