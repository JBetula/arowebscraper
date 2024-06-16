//DUMMY
const express = require('express');
const router = express.Router();
const metarController = require('../controllers/metarController');
const tafController = require('../controllers/tafController');

router.get('/taf', tafController.getTAF);
router.get('/metar', metarController.getMetar);
router.get('/manymetar', metarController.getManyMetar);
router.get('/allmetar', metarController.getAllAirports);
router.get('/all', metarController.all);

module.exports = router;