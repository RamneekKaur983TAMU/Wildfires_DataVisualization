const express = require('express');
const router = express.Router();
const { getSummary, getDamageByCounty, getFireMapData, getDamageDistribution, getHeatmapData } = require('../controllers/edaController');

router.get('/summary', getSummary);
router.get('/damage-by-county', getDamageByCounty);
router.get('/fire-map-by-county', getFireMapData);
router.get('/damage-distribution', getDamageDistribution);
router.get('/heatmap-data', getHeatmapData);

module.exports = router;
