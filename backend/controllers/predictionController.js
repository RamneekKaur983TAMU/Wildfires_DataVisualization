const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { exec } = require('child_process');

const filePath = path.join(__dirname, '../datasets/TransformedData.csv');



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
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      const yearCounts = {};

      results.forEach(row => {
        const year = parseInt(row['Start Year']);
        if (!isNaN(year)) {
          yearCounts[year] = (yearCounts[year] || 0) + 1;
        }
      });

      const historicalYears = Object.keys(yearCounts).map(Number).sort();
      const historicalCounts = historicalYears.map(year => yearCounts[year]);

      // Weighted moving average: last 3 years
      const weights = [0.2, 0.3, 0.5];
      const predictWMA = (baseYears) => {
        const last = baseYears.slice(-3);
        if (last.length < 3) return null;
        return Math.round(
          last.reduce((acc, y, i) => acc + yearCounts[y] * weights[i], 0)
        );
      };

      const years = [2021, 2022, 2023, 2024, 2025, 2026];
      const maxYear = Math.max(...historicalYears);
      const data = years.map(year => {
        const historical = yearCounts[year] || null;
        const predicted = year > maxYear ? predictWMA(historicalYears) : null;
        const confidence = predicted !== null ? 94 : null;
        return { year, historical, predicted, confidence };
      });

      res.json(data);
    })
    .on('error', (err) => {
      console.error('Forecast CSV error:', err);
      res.status(500).json({ error: 'Failed to process forecast data.' });
    });
};


const damageWeights = {
  'No Damage': 0,
  'Affected (1-9%)': 1,
  'Minor (10-25%)': 2,
  'Destroyed (>50%)': 4,
};



exports.getRiskRadarData = (req, res) => {
  const fs = require('fs');
  

  // Storage for our processed data
  const structureTypeData = {};
  const yearlyData = {};
  
  // Load and process the CSV data
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Parse the data we need
      const structureType = data['Structure Type'] || 'Unknown';
      const damage = data['Damage'] || 'No Damage';
      const startYear = parseInt(data['Start Year'], 10);
      
      // Skip records with missing critical data or invalid years
      if (!structureType || isNaN(startYear)) return;
      
      // Initialize structure type data if it doesn't exist
      if (!structureTypeData[structureType]) {
        structureTypeData[structureType] = {
          yearCounts: {},
          totalDamageWeight: 0,
          incidentCount: 0
        };
      }
      
      // Track incidents per year for this structure type
      if (!structureTypeData[structureType].yearCounts[startYear]) {
        structureTypeData[structureType].yearCounts[startYear] = 0;
      }
      structureTypeData[structureType].yearCounts[startYear]++;
      
      // Increment total incidents for this structure type
      structureTypeData[structureType].incidentCount++;
      
      // Calculate damage weight
      let damageWeight = 0;
      for (const [damageType, weight] of Object.entries(damageWeights)) {
        if (damage.includes(damageType)) {
          damageWeight = weight;
          break;
        }
      }
      
      // Add to total damage weight for this structure type
      structureTypeData[structureType].totalDamageWeight += damageWeight;
      
      // Track yearly totals
      if (!yearlyData[startYear]) {
        yearlyData[startYear] = { incidents: 0, damageWeight: 0 };
      }
      yearlyData[startYear].incidents++;
      yearlyData[startYear].damageWeight += damageWeight;
    })
    .on('end', () => {
      // Prepare predictions for 2025 using linear regression
      const predictions = [];
      
      Object.entries(structureTypeData).forEach(([structureType, data]) => {
        const years = Object.keys(data.yearCounts).map(Number).sort();
        
        // Need at least 2 years of data for regression
        if (years.length < 2) {
          predictions.push({
            category: structureType,
            risk: 0,
            predictedIncidents: data.incidentCount > 0 ? 1 : 0,
            message: "Insufficient historical data"
          });
          return;
        }
        
        // Prepare data points for linear regression
        const points = years.map(year => ({
          x: year,
          y: data.yearCounts[year]
        }));
        
        // Linear regression implementation
        const n = points.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        
        points.forEach(point => {
          sumX += point.x;
          sumY += point.y;
          sumXY += point.x * point.y;
          sumXX += point.x * point.x;
        });
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // Predict incidents for 2025
        const predictedIncidents = Math.max(0, Math.round(slope * 2025 + intercept));
        
        // Calculate average damage per incident
        const avgDamageWeight = data.incidentCount > 0 ? 
          data.totalDamageWeight / data.incidentCount : 0;
        
        // Calculate risk score (0-100)
        // Based on average damage weight (normalized to 0-80) plus trend factor (0-20)
        const maxDamageWeight = damageWeights['Destroyed (>50%)'];
        const trendFactor = slope > 0 ? Math.min(20, slope * 5) : 0;
        const damageScore = Math.min(80, (avgDamageWeight / maxDamageWeight) * 80);
        const riskScore = Math.round(damageScore + trendFactor);
        
        predictions.push({
          category: structureType,
          risk: riskScore,
          predictedIncidents: predictedIncidents,
          avgDamageWeight: avgDamageWeight.toFixed(2),
          trend: slope > 0 ? "Increasing" : slope < 0 ? "Decreasing" : "Stable",
          slopeValue: slope.toFixed(4)
        });
      });
      
      // Also calculate overall prediction for 2025
      const overallYears = Object.keys(yearlyData).map(Number).sort();
      if (overallYears.length >= 2) {
        const overallPoints = overallYears.map(year => ({
          x: year,
          y: yearlyData[year].incidents
        }));
        
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        const n = overallPoints.length;
        
        overallPoints.forEach(point => {
          sumX += point.x;
          sumY += point.y;
          sumXY += point.x * point.y;
          sumXX += point.x * point.x;
        });
        
        const overallSlope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const overallIntercept = (sumY - overallSlope * sumX) / n;
        
        // Add overall prediction to the results
        predictions.push({
          category: "Overall",
          risk: null, // Not applicable for overall
          predictedIncidents: Math.max(0, Math.round(overallSlope * 2025 + overallIntercept)),
          trend: overallSlope > 0 ? "Increasing" : overallSlope < 0 ? "Decreasing" : "Stable",
          slopeValue: overallSlope.toFixed(4)
        });
      }
      
      // Sort by risk score (highest first)
      predictions.sort((a, b) => (b.risk || 0) - (a.risk || 0));
      console.log(predictions)
      res.json(predictions);
    });
};

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


function linearRegression(xs, ys) {
  const n      = xs.length;
  const meanX  = xs.reduce((a, b) => a + b, 0) / n;
  const meanY  = ys.reduce((a, b) => a + b, 0) / n;
  const num    = xs.reduce((sum, x, i) => sum + (x - meanX) * (ys[i] - meanY), 0);
  const den    = xs.reduce((sum, x) => sum + (x - meanX) ** 2, 0);
  const m      = num / den;
  const b      = meanY - m * meanX;
  return { m, b };
}

exports.getIntensityData = (req, res) => {
  const rows = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', row => rows.push(row))
    .on('end', () => {
      // 1) Count each damage-level per year
      const yearly = {};
      rows.forEach(r => {
        const y   = parseInt(r['Start Year'], 10);
        const lvl = r['Damage']?.trim() || 'Unknown';
        if (!y) return;
        yearly[y] = yearly[y] || {};
        yearly[y][lvl] = (yearly[y][lvl]||0) + 1;
      });

      // 2) Build sorted years array and all distinct levels
      const years  = Object.keys(yearly).map(Number).sort();
      const levels = Array.from(new Set(rows.map(r => r['Damage']?.trim()).filter(Boolean)));

      // 3) Convert counts → proportions by year
      years.forEach(y => {
        const total = Object.values(yearly[y]).reduce((a,b) => a + b, 0) || 1;
        levels.forEach(l => {
          yearly[y][l] = (yearly[y][l] || 0) / total;
        });
      });

      // 4) Fit regression per level → raw prediction for 2025
      const rawPred = {};
      levels.forEach(l => {
        const xs = [], ys = [];
        years.forEach(y => {
          xs.push(y);
          ys.push(yearly[y][l] || 0);
        });
        const { m, b } = linearRegression(xs, ys);
        rawPred[l] = Math.max(0, m * 2025 + b);
      });

      // 5) Map original levels into 4 buckets
      const bucketMap = {
        'No Damage':         'Low',
        'Affected (1-9%)':   'Moderate',
        'Affected (10-25%)': 'Moderate',
        'Affected (26-50%)': 'High',
        'Affected (51-74%)': 'High',
        'Affected (75-100%)': 'Severe',
        'Destroyed':         'Severe'
      };
      const agg = { Low: 0, Moderate: 0, High: 0, Severe: 0 };
      Object.entries(rawPred).forEach(([lvl, v]) => {
        const bucket = bucketMap[lvl] || 'Moderate';
        agg[bucket] += v;
      });

      // 6) Normalize to 100% and format
      const totalAgg = Object.values(agg).reduce((a,b) => a + b, 0) || 1;
      const output = ['Low','Moderate','High','Severe'].map(level => ({
        level,
        value: parseFloat(((agg[level] / totalAgg) * 100).toFixed(1))
      }));

      res.json(output);
    });
};

exports.getPredictionSummary = (req, res) => {
  const summaryPath = path.join(__dirname, '../datasets/predicted_kpis.json');

  fs.readFile(summaryPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read summary_kpis.json:', err);
      return res.status(500).json({ error: 'Failed to load summary KPI data' });
    }

    try {
      const parsed = JSON.parse(data);
      res.json(parsed);
    } catch (parseError) {
      console.error('Invalid JSON format in summary_kpis.json:', parseError);
      res.status(500).json({ error: 'Invalid KPI JSON format' });
    }
  });
};