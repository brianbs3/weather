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
  
  
  // let img = Buffer.from(qr, 'base64');
  let str=""
  for(let i = 1; i <= 60; i++){
    const uuid = uuidv4();
    const qr = await QRCode.toDataURL(uuid)
    str += `${i} (${uuid}): <img src='${qr}'><br>`;
  }
  
  console.log(str);
  return res.send(str);
});

module.exports = router;