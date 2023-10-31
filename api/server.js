'use strict';

const express = require('express');

const app = express();
const router = express.Router();
const morgan = require('morgan');
const path = require('path');
var cors = require('cors');
const compression = require('compression');


require('dotenv').config();

app.use(cors())

app.use(morgan('dev'));
app.use(express.json());
app.use(compression());

/*
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});
*/
app.get('/test', (req, res) => {
    return res.json({message: 'test'});
});

//app.use('/', express.static('/data/weather'));  //path.join(__dirname, 'static')))
app.use('/', express.static(path.join(__dirname, 'static')));  //

const weather = require('./routes/weather');
app.use('/weather', weather);

const noaa = require('./routes/noaa');
app.use('/noaa', noaa);

const metrics = require('./routes/metrics');
app.use('/metrics', metrics);

const pico = require('./routes/pico');
app.use('/pico', pico);

const qrcode = require('./routes/qrcode');
app.use('/qrcode', qrcode);

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;
