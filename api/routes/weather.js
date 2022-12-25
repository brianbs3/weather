'use strict';

const router = require('express').Router();
const redis = require("redis");
const {getRedisWeather} = require('../utils/db');

router.get('/', async (req, res) => {
  const [w] = await Promise.all([
    getRedisWeather()
  ]);
  return res.json(w);
});

router.patch('/setHeaterTemp', type, async (req, res) => {
    try {
        const {target_temp} = req.body;
        
        await db.sequelize.models.business_trips.upsert({
            description: description,
            notes: notes,
            start_date: start_date,
            end_date: end_date
        });
        let business_trip = await db.sequelize.models.business_trips.findOne({
            where: { description: description, start_date: start_date, end_date: end_date }
        });
        
        return res.status(201).json({business_trip});
        
    } catch (err) {
        console.error('Error Setting Target Temperature: ', err);
        return res.status(500).json({ status: 'FAILED', message: err.message });
    }
});

module.exports = router;
