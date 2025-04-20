const express = require('express');
const router = express.Router();

const {
  getPredictionSummary,
  getPredictionCount,
  getPredictionMap,
  getForecastTrends,
  getIntensityData,
  getRiskRadarData,
  getSeverityGaugeData,
  getForecastedHotspots
} = require('../controllers/predictioncontroller');

router.get('/summary', getPredictionSummary);
router.get('/count', getPredictionCount);
router.get('/map', getPredictionMap);
router.get('/trends', getForecastTrends);
router.get('/intensity', getIntensityData);
router.get('/risk', getRiskRadarData);
router.get('/severity', getSeverityGaugeData);
router.get('/forecast', getForecastedHotspots);


module.exports = router;
