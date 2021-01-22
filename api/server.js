'use strict';

const express = require('express');

const app = express();
const router = express.Router();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});
app.get('/test', (req, res) => {
    return res.json({message: 'test'});
});

app.use('/', express.static(path.join(__dirname, 'static')))

const weather = require('./routes/weather');
app.use('/weather', weather);

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;
