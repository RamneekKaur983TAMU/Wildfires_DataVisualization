const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const damageMap = {
  'No Damage': 0,
  'Affected (1-9%)': 5,
  'Affected (10-25%)': 17.5,
  'Affected (26-50%)': 38,
  'Affected (51-74%)': 62.5,
  'Affected (75-100%)': 87.5,
  'Destroyed': 100
};

const filePath = path.join(__dirname, '..', 'datasets', 'TransformedData.csv');

exports.getSummary = (req, res) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const totalIncidents = results.length;

      // Unique cities
      const citySet = new Set(results.map(row => row['City']?.trim()).filter(Boolean));
      const totalCities = citySet.size;

      // Highest fire date
      const fireDateCount = {};
      results.forEach(row => {
        const date = row['Incident Start Date']?.trim();
        if (date) fireDateCount[date] = (fireDateCount[date] || 0) + 1;
      });
      const highestFireDate = Object.entries(fireDateCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';

      // Damage estimation by year
      const yearDamage = {};
      results.forEach(row => {
        const yearRaw = row['Start Year'];
        const year = typeof yearRaw === 'string' ? yearRaw.trim() : String(yearRaw);
        const damage = damageMap[row['Damage']] ?? 0;
        if (year) yearDamage[year] = (yearDamage[year] || 0) + damage;
      });
      const mostDamagedYear = Object.entries(yearDamage).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';

      // Most affected city
      const cityCount = {};
      results.forEach(row => {
        const city = row['City']?.trim();
        if (city) cityCount[city] = (cityCount[city] || 0) + 1;
      });
      const mostAffectedCity = Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';

      // Most affected street
      const streetCount = {};
      results.forEach(row => {
        const number = row['Street Number'];
        const name = row['Street Name']?.trim();
        const numClean = typeof number === 'string' ? number.trim() : String(number);

        if (numClean && name) {
          const street = `${numClean} ${name}`;
          streetCount[street] = (streetCount[street] || 0) + 1;
        }
      });
      const mostAffectedStreet = Object.entries(streetCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';

      res.json({
        totalIncidents,
        totalCities,
        highestFireDate,
        mostDamagedYear,
        mostAffectedCity,
        mostAffectedStreet
      });
    });
};

exports.getDamageByCounty = (req, res) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      const countyDamage = {};

      results.forEach(row => {
        const county = row['County']?.trim();
        const damage = damageMap[row['Damage']] ?? 0;
        if (!county) return;
        if (!countyDamage[county]) {
          countyDamage[county] = { total: 0, count: 0 };
        }
        countyDamage[county].total += damage;
        countyDamage[county].count += 1;
      });

      const response = Object.entries(countyDamage).map(([county, { total, count }]) => ({
        county,
        averageDamage: parseFloat((total / count).toFixed(2))
      }));

      res.json(response);
    });
};


exports.getFireMapData = (req, res) => {
    const results = [];
    const fs = require('fs');
    const csv = require('csv-parser');
    const path = require('path');
    const filePath = path.join(__dirname, '..', 'datasets', 'TransformedData.csv');
  
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => {
        const countyData = {};
  
        results.forEach(row => {
          const county = row['County']?.trim();
          const lat = parseFloat(row['Latitude']);
          const lon = parseFloat(row['Longitude']);
          if (!county || isNaN(lat) || isNaN(lon)) return;
  
          if (!countyData[county]) {
            countyData[county] = { count: 0, latSum: 0, lonSum: 0 };
          }
  
          countyData[county].count++;
          countyData[county].latSum += lat;
          countyData[county].lonSum += lon;
        });
  
        const data = Object.entries(countyData).map(([county, info]) => ({
          county,
          totalFires: info.count,
          lat: info.latSum / info.count,
          lon: info.lonSum / info.count
        }));
  
        res.json(data);
    });
};

exports.getDamageDistribution = (req, res) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', row => results.push(row))
    .on('end', () => {
      const distribution = {};
      results.forEach(row => {
        const damage = row['Damage']?.trim();
        const id = row['_id']?.trim();
        if (id) {
          distribution[damage] = (distribution[damage] || 0) + 1;
        }
      });

      const chartData = Object.entries(distribution).map(([damage, count]) => ({
        damage,
        count
      }));

      res.json(chartData);
    });
};

exports.getHeatmapData = (req, res) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      const heatmap = {};

      results.forEach(row => {
        const month = row['Start Month Name']?.trim();
        const day = row['Start Day']?.trim();
        const id = row['_id']?.trim();

        if (month && day && id) {
          const dayStr = String(day);
          if (!heatmap[dayStr]) heatmap[dayStr] = {};
          heatmap[dayStr][month] = (heatmap[dayStr][month] || 0) + 1;
        }
      });

      res.json(heatmap);
    });
};