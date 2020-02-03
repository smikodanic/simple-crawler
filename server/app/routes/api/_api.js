const express = require('express');
const router = express.Router();

const crawlerR = require('./crawler.js');
router.post('/crawler/start', crawlerR.start);
router.get('/crawler/getdata', crawlerR.getdata);

module.exports = router;
