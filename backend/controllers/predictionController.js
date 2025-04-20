const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const ss = require('simple-statistics');

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


// exports.getRiskRadarData = (req, res) => {
//  res.json([
//    { category: 'Residential', risk: 85 },
//    { category: 'Forest', risk: 92 },
//    { category: 'Farmland', risk: 78 },
//    { category: 'Urban', risk: 69 }
//  ]);
// };



// exports.getSeverityGaugeData = (req, res) => {
//   res.json([
//     { name: 'Severity', value: 72 }
//   ]);
// };
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

