// routes/edaRoutes.js
const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/edaController');

router.get('/summary', getSummary);

module.exports = router;
