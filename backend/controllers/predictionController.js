const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { exec } = require('child_process');


const filePath = path.join(__dirname, '../datasets/TransformedData.csv');

// Summary widget
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

// Rule-based map fallback (deprecated)
exports.getPredictionMap = (req, res) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      const damage = row['Damage'] || '';
      const lat = parseFloat(row['Latitude']);
      const lng = parseFloat(row['Longitude']);

      if (!isNaN(lat) && !isNaN(lng)) {
        let risk = 'Low';
        if (damage.includes('Affected')) {
          risk = 'High';
        }

        results.push({ lat, lng, risk });
      }
    })
    .on('end', () => {
      res.json(results);
    })
    .on('error', (err) => {
      console.error('Error reading CSV for map:', err);
      res.status(500).json({ error: 'Failed to load prediction map data' });
    });
};

// Forecast trends chart (dummy)
exports.getForecastTrends = (req, res) => {
 const years = ['2021', '2022', '2023', '2024', '2025'];
 const data = years.map((year, index) => ({
   year,
   historical: index < 3 ? Math.floor(Math.random() * 200 + 100) : null,
   predicted: index >= 2 ? Math.floor(Math.random() * 300 + 150) : null
 }));
 res.json(data);
};


// Risk intensity bar chart
exports.getIntensityData = (req, res) => {
 res.json([
   { level: 'Low', value: 18 },
   { level: 'Moderate', value: 32 },
   { level: 'High', value: 21 },
   { level: 'Severe', value: 9 }
 ]);
};


// Radar chart categories
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


// Gauge component
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

// ✅ NEW: ARIMA-based forecast for top 5 hotspots
exports.getForecastedHotspots = (req, res) => {
  const forecastScript = path.join(__dirname, '../forecasting/forecast.py');

  exec(`python3 "${forecastScript}"`, (error, stdout, stderr) => {
    // Log Python script output (debugs printed from forecast.py)
    if (stdout) {
      console.log("📤 forecast.py stdout:\n" + stdout);
    }
    if (stderr) {
      console.error("⚠️ forecast.py stderr:\n" + stderr);
    }

    if (error) {
      console.error('❌ Forecast script error:', error);
      return res.status(500).json({ error: 'Forecast execution failed' });
    }

    const forecastFile = path.join(__dirname, '../datasets/forecast_output.json');

    fs.readFile(forecastFile, 'utf8', (err, data) => {
      if (err) {
        console.error('❌ Failed to load forecast output:', err);
        return res.status(500).json({ error: 'Failed to load forecast data' });
      }

      res.json(JSON.parse(data));
    });
  });
};

// ✅ NEW: ARIMA-based forecast for top 5 hotspots
exports.getForecastedHotspots = (req, res) => {
  const forecastScript = path.join(__dirname, '../forecasting/forecast.py');

  exec(`python3 "${forecastScript}"`, (error, stdout, stderr) => {
    // Log Python script output (debugs printed from forecast.py)
    if (stdout) {
      console.log("📤 forecast.py stdout:\n" + stdout);
    }
    if (stderr) {
      console.error("⚠️ forecast.py stderr:\n" + stderr);
    }

    if (error) {
      console.error('❌ Forecast script error:', error);
      return res.status(500).json({ error: 'Forecast execution failed' });
    }

    const forecastFile = path.join(__dirname, '../datasets/forecast_output.json');

    fs.readFile(forecastFile, 'utf8', (err, data) => {
      if (err) {
        console.error('❌ Failed to load forecast output:', err);
        return res.status(500).json({ error: 'Failed to load forecast data' });
      }

      res.json(JSON.parse(data));
    });
  });
};