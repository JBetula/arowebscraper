//DUMMY
const express = require('express');
const router = express.Router();
const notamController = require('../controllers/notamController');

router.get('/notam', notamController.getNotam);

module.exports = router;