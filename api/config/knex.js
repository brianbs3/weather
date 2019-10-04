//const Knex = require('knex');
const config = require('../config');


const knex = require('knex')(config.DB,{
    debug: ['comQueryPacket']
});

// const knex = require('knex')({
//     client: 'pg',
//     // version: '7.2',
//     connection: {
//       host : config.PG_HOST,
//       user : config.PG_USER,
//       password : config.PG_PASSWORD,
//       database : config.PG_DB,
//       port: config.PG_PORT
//     }
//   });

module.exports = knex;