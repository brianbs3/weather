'use strict';

const router = require('express').Router();
const redis = require("redis");
const { getRedisWeather, setHeaterTemp } = require('../utils/db');

router.get('/', async (req, res) => {
  const [w] = await Promise.all([
    getRedisWeather()
  ]);
  return res.json(w);
});

router.post('/setHeaterTemp', async (req, res) => {
    try{
        const {target_temp} = req.query;
        
        console.log(target_temp);
        const [w] = await Promise.all([
            setHeaterTemp()
        ]);
        
        return res.json(w);
    }
    catch (err) {
    console.error('Error uploading receipt: ', err);
    return res.status(500).json({ status: 'FAILED', message: err.message });
}
});

module.exports = router;
