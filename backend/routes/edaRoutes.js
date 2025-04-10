// routes/edaRoutes.js
const express = require('express');
const router = express.Router();
const { getSummary, getDamageByCounty , getDamageTrend,  getFireMapData } = require('../controllers/edaController');

router.get('/summary', getSummary);
router.get('/damage-by-county', getDamageByCounty);
router.get('/damage-trend', getDamageTrend);
router.get('/fire-map-by-county', getFireMapData);
module.exports = router;