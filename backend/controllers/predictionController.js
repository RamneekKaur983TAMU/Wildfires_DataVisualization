const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const filePath = path.join(__dirname, '../datasets/TransformedData.csv');

exports.getPredictionSummary = (req, res) => {
  res.json({
    predictedHotspots: 27,
    predictedSeverity: 'High',
    predictedTime: '2-5 PM',
    predictedCount: 689,
  });
};

exports.getPredictionCount = (req, res) => {
  const years = ['2024', '2025', '2026'];
  const data = years.map(year => ({
    year,
    count: Math.floor(Math.random() * 300 + 200)
  }));
  res.json(data);
};

exports.getPredictionMap = (req, res) => {
  const hotspots = [
    { lat: 36.7783, lng: -119.4179, risk: 'High' },
    { lat: 34.0522, lng: -118.2437, risk: 'Medium' },
    { lat: 38.5816, lng: -121.4944, risk: 'High' },
    { lat: 37.7749, lng: -122.4194, risk: 'Low' }
  ];
  res.json(hotspots);
};

exports.getForecastTrends = (req, res) => {
  const years = ['2021', '2022', '2023', '2024', '2025'];
  const data = years.map((year, index) => ({
    year,
    historical: index < 3 ? Math.floor(Math.random() * 200 + 100) : null,
    predicted: index >= 2 ? Math.floor(Math.random() * 300 + 150) : null
  }));
  res.json(data);
};

exports.getIntensityData = (req, res) => {
  res.json([
    { level: 'Low', value: 18 },
    { level: 'Moderate', value: 32 },
    { level: 'High', value: 21 },
    { level: 'Severe', value: 9 }
  ]);
};

exports.getRiskRadarData = (req, res) => {
  res.json([
    { category: 'Residential', risk: 85 },
    { category: 'Forest', risk: 92 },
    { category: 'Farmland', risk: 78 },
    { category: 'Urban', risk: 69 }
  ]);
};

exports.getSeverityGaugeData = (req, res) => {
  res.json([
    { name: 'Severity', value: 72 }
  ]);
};
