'use strict';

const router = require('express').Router();
const redis = require("redis");
const { v4: uuidv4 } = require('uuid');
const knex = require('../config/knex');
const moment = require('moment');
const QRCode = require('qrcode')
const { setPicoTemp, updatePico } = require('../utils/db');
const { getPicoReadings } = require('../utils/mysql');

router.get('/',  async (req, res) => {
  
  const qr = await QRCode.toDataURL(uuidv4())
  let img = Buffer.from(qr, 'base64');
  
  console.log(qr);
  return res.send(`<img src='${qr}'>`);
});

module.exports = router;