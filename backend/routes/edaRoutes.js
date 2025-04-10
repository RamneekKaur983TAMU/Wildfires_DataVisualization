const express = require('express');
const router = express.Router();
const { getSummary, getDamageByCounty , getDamageTrend,  getFireMapData, getDamageDistribution, getHeatmapData , getStructureTypeDamageSummary, getIncidentsByCounty } = require('../controllers/edaController');

router.get('/summary', getSummary);
router.get('/damage-by-county', getDamageByCounty);
router.get('/damage-trend', getDamageTrend);
router.get('/fire-map-by-county', getFireMapData);
router.get('/getStructureTypeDamageSummary' , getStructureTypeDamageSummary)
router.get('/incidents-by-county', getIncidentsByCounty);
router.get('/damage-distribution', getDamageDistribution);
router.get('/heatmap-data', getHeatmapData);

module.exports = router;