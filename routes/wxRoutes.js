//DUMMY
const express = require('express');
const router = express.Router();
const metarController = require('../controllers/metarController');
const tafController = require('../controllers/tafController');

router.get('/taf', tafController.getTAF);
router.get('/metar', metarController.getMetar);
router.get('/allmetar', metarController.getAllMetar);

module.exports = router;