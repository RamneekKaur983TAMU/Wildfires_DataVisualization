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


// exports.getPredictionCount = (req, res) => {
//   const years = ['2024', '2025', '2026'];
//   const data = years.map(year => ({
//     year,
//     count: Math.floor(Math.random() * 300 + 200)
//   }));
//   res.json(data);
// };


exports.getPredictionCount = (req, res) => {


 const yearCounts = {};


 fs.createReadStream(filePath)
   .pipe(csv())
   .on('data', (row) => {
     const year = parseInt(row['Start Year']);
     if (!isNaN(year)) {
       yearCounts[year] = (yearCounts[year] || 0) + 1;
     }
   })
   .on('end', () => {
     // Filter and sort years
     const years = Object.keys(yearCounts)
       .map(Number)
       .filter((y) => y >= 2015 && y <= 2024)
       .sort((a, b) => a - b);


     if (years.length < 2) {
       return res.status(500).json({ error: 'Not enough data to predict' });
     }


     // Linear regression: y = mx + b
     const n = years.length;
     const sumX = years.reduce((a, b) => a + b, 0);
     const sumY = years.reduce((a, b) => a + yearCounts[b], 0);
     const sumXY = years.reduce((sum, x) => sum + x * yearCounts[x], 0);
     const sumX2 = years.reduce((sum, x) => sum + x * x, 0);


     const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
     const b = (sumY - m * sumX) / n;


     // Predict for 2025–2027
     const predictions = [2025, 2026, 2027].map((year) => ({
       year: String(year),
       count: Math.round(m * year + b),
     }));


     res.json(predictions);
   })
   .on('error', (err) => {
     console.error('CSV read error:', err);
     res.status(500).json({ error: 'Failed to process CSV data' });
   });
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


// exports.getSeverityGaugeData = (req, res) => {
//   res.json([
//     { name: 'Severity', value: 72 }
//   ]);
// };


exports.getSeverityGaugeData = (req, res) => {
 const results = [];


 const damageWeights = {
   'No Damage': 0,
   'Affected (1-9%)': 1,
   'Minor (10-25%)': 2,
   'Destroyed (>50%)': 4,
 };


 fs.createReadStream(filePath)
   .pipe(csv())
   .on('data', (data) => results.push(data))
   .on('end', () => {
     const yearWise = {};


     results.forEach((row) => {
       const year = parseInt(row['Start Year']);
       const damage = row['Damage'];
       const weight = damageWeights[damage];


       if (!isNaN(year) && weight !== undefined) {
         if (!yearWise[year]) {
           yearWise[year] = { total: 0, count: 0 };
         }
         yearWise[year].total += weight;
         yearWise[year].count += 1;
       }
     });


     const yearData = Object.entries(yearWise)
       .map(([year, { total, count }]) => ({
         year: parseInt(year),
         avg: total / count,
       }))
       .sort((a, b) => a.year - b.year);


     if (yearData.length < 2) {
       const last = yearData.at(-1)?.avg || 0;
       return res.json([{ name: 'Severity', value: Math.round((last / 4) * 100) }]);
     }


     // Linear regression
     const n = yearData.length;
     const sumX = yearData.reduce((sum, d) => sum + d.year, 0);
     const sumY = yearData.reduce((sum, d) => sum + d.avg, 0);
     const sumXY = yearData.reduce((sum, d) => sum + d.year * d.avg, 0);
     const sumX2 = yearData.reduce((sum, d) => sum + d.year * d.year, 0);


     const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
     const intercept = (sumY - slope * sumX) / n;


     const currentYear = new Date().getFullYear();
     const predictedAvg = slope * currentYear + intercept;


     // Scale to 0–100 (based on max weight = 4)
     const predictedSeverity = Math.round((predictedAvg / 4) * 100);


     res.json([{ name: 'Severity', value: predictedSeverity }]);
   })
   .on('error', (err) => {
     console.error('Error reading CSV:', err);
     res.status(500).json({ error: 'Failed to process data' });
   });
};

