const redis = require("redis");
const client = redis.createClient({url: 'redis://localhost:6379'});
const knex = require('../config/knex');

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
    await client.quit();
  }
  catch(error){
    console.log(error);
  }
    });
}


const getNoaaWeather = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await redis.createClient({ url: 'redis://localhost:6379' });
      let weather;
      client.on("error", function (error) {
        console.error(error);
      });
      await client.multi()
        .get('NOAA')
        .exec((err, replies) => {
          console.log(replies);
          resolve(
            {
              NOAA: JSON.parse(replies[0])
            });
        });
      await client.quit();
    }
    catch (error) {
      console.log(error);
    }
  });
}

const setHeaterTemp = async (target_temp) => {
    return new Promise(async (resolve, reject) => {
        try{
    const client = await redis.createClient({url: 'redis://localhost:6379'});
    
    client.on("error", function(error) {
      console.error(error);
    });

  //   client.set('foo', 'bar', (err, reply) => {
  //     if (err) throw err;
  //     console.log(reply);
  
  //     client.get('foo', (err, reply) => {
  //         if (err) throw err;
  //         console.log(reply);
  //     });
  // });
    console.log(target_temp)
    await client.set('shop_heater_target_temp', `${target_temp}`, function (err, reply) {
      if(!err)
        resolve(reply);
      resolve(err);
      
    });
    await client.quit();
  }
  catch(error){
    console.log(error);
  }
    });
}

const setPicoTemp = async (host, humidity, temp_c, temp_f, ts) => {
    return new Promise(async (resolve, reject) => {
      try{
        const client = await redis.createClient({url: 'redis://localhost:6379'});
        const vals = [
          `temp_c_${host}`, `${temp_c}`, 
          `temp_f_${host}`, `${temp_f}`, 
          `update_ts_${host}`, `${ts}`,
          `humidity_${host}`, `${humidity}`,
          ]
        client.on("error", function(error) {
          console.error(error);
        });

        await client.mset(vals, function (err, reply) {
          if(!err)
            resolve(reply);
          resolve(err);
          
        });
        await client.quit();
      }
      catch(error){
        console.log(error);
      }
    });
}

const updatePico = async (data) => {
  return new Promise(async (resolve, reject) => {
    try{
      
      const m = await knex('pico')
      .where('id', data.id)
      .update(data)

      resolve(m);
      
    }
    catch(error){
      console.log(error);
    }
  });
}

module.exports = {
    getRedisWeather,
    getNoaaWeather,
    setHeaterTemp,
    setPicoTemp,
    updatePico
};
