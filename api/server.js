// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
require('dotenv').config();
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var csv  = require('csv-express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
const compression = require('compression');

var jwt = require('jsonwebtoken');

const config = require('./config');

const weather = require('./routes/weather');


// app.use(morgan('dev', { stream: logger.stream }));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Sequelize = require('sequelize');
var knex = require('knex');

var port = process.env.PORT || 8082;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// Define the base route, which is going to be a help file
router.get('/', (req, res) => {
    res.json({
        message: 'Weather API',
        help: 'see README here: https://github.com/brianbs3/weather/blob/2019/README.md',
    });
});

router.get('/__stats/instance', (req, res) => {
    let stats = {}
    stats.MetricsKV = process.memoryUsage();
    res.json(stats);
});

router.get('/__stats/global', (req, res) => {
    let stats = {}
    stats.MetricsKV = process.memoryUsage();
    res.json(stats);
});

app.use('/', router);

app.use('/weather', weather);

/*******************
  START THE SERVER
********************/

app.listen(port);
console.log('racks-api now running on  ' + port);