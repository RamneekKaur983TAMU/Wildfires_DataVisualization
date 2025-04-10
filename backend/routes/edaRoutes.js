// routes/edaRoutes.js
const express = require('express');
const router = express.Router();
const { getSummary, getDamageByCounty } = require('../controllers/edaController');

router.get('/summary', getSummary);
router.get('/damage-by-county', getDamageByCounty);

module.exports = router;
