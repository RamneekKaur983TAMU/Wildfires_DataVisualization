// routes/edaRoutes.js
const express = require('express');
const router = express.Router();
const { getSummary, getDamageByCounty, getIncidentsByCounty } = require('../controllers/edaController');

router.get('/summary', getSummary);
router.get('/damage-by-county', getDamageByCounty);
router.get('/incidents-by-county', getIncidentsByCounty);

module.exports = router;
