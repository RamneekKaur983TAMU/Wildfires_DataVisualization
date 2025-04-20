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

const applyFilters = (row, year, county, damage) => {
  return (
    (!year || row['Start Year'] === year) &&
    (!county || row['County']?.trim() === county) &&
    (!damage || row['Damage']?.trim() === damage)
  );
};

exports.getSummary = (req, res) => {
  const results = [];
  const { year, county, damage } = req.query;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const filtered = results.filter(row => applyFilters(row, year, county, damage));
      const totalIncidents = filtered.length;

      const citySet = new Set(filtered.map(row => row['City']?.trim()).filter(Boolean));
      const totalCities = citySet.size;

      const fireDateCount = {};
      filtered.forEach(row => {
        const date = row['Incident Start Date']?.trim();
        if (date) fireDateCount[date] = (fireDateCount[date] || 0) + 1;
      });
      const highestFireDate = Object.entries(fireDateCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';

      const yearDamage = {};
      filtered.forEach(row => {
        const yearVal = row['Start Year'];
        const damageVal = damageMap[row['Damage']] ?? 0;
        if (yearVal) yearDamage[yearVal] = (yearDamage[yearVal] || 0) + damageVal;
      });
      const mostDamagedYear = Object.entries(yearDamage).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';

      const cityCount = {};
      filtered.forEach(row => {
        const city = row['City']?.trim();
        if (city) cityCount[city] = (cityCount[city] || 0) + 1;
      });
      const mostAffectedCity = Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';

      const streetCount = {};
      filtered.forEach(row => {
        const number = row['Street Number'];
        const name = row['Street Name']?.trim();
        const numClean = typeof number === 'string' ? number.trim() : String(number);
        if (numClean && name) {
          const street = `${numClean} ${name}`;
          streetCount[street] = (streetCount[street] || 0) + 1;
        }
      });
      const mostAffectedStreet = (
        Object.entries(streetCount)
          .filter(([street]) => street !== '0.0 Unknown')
          .sort((a, b) => b[1] - a[1])[0]?.[0]
      ) || '--';

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
  const { year, county, damage } = req.query;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      const countyDamage = {};

      results.forEach(row => {
        if (!applyFilters(row, year, county, damage)) return;

        const c = row['County']?.trim();
        const dmg = damageMap[row['Damage']] ?? 0;
        if (!c) return;
        if (!countyDamage[c]) {
          countyDamage[c] = { total: 0, count: 0 };
        }
        countyDamage[c].total += dmg;
        countyDamage[c].count += 1;
      });

      const response = Object.entries(countyDamage).map(([county, { total, count }]) => ({
        county,
        averageDamage: parseFloat((total / count).toFixed(2))
      }));

      res.json(response);
    });
};

exports.getDamageTrend = (req, res) => {
  const results = [];
  const { year, county, damage } = req.query;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      const trend = {};

      results.forEach(row => {
        if (!applyFilters(row, year, county, damage)) return;

        const dateRaw = row['Incident Start Date'];
        if (!dateRaw) return;
        const date = new Date(dateRaw.trim());
        if (isNaN(date)) return;
        const y = date.getFullYear();

        if (!trend[y]) trend[y] = { fireCount: 0 };
        trend[y].fireCount += 1;
      });

      const response = Object.entries(trend)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([year, { fireCount }]) => ({ year, fireCount }));

      res.json(response);
    });
};

exports.getFireMapData = (req, res) => {
  const results = [];
  const { year, county, damage } = req.query;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      const countyData = {};

      results.forEach(row => {
        if (!applyFilters(row, year, county, damage)) return;

        const c = row['County']?.trim();
        const lat = parseFloat(row['Latitude']);
        const lon = parseFloat(row['Longitude']);
        if (!c || isNaN(lat) || isNaN(lon)) return;

        if (!countyData[c]) {
          countyData[c] = { count: 0, latSum: 0, lonSum: 0 };
        }

        countyData[c].count++;
        countyData[c].latSum += lat;
        countyData[c].lonSum += lon;
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

exports.getStructureTypeDamageSummary = (req, res) => {
  const results = [];
  const { year, county, damage } = req.query;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const structureDamageData = {};

      results.forEach(row => {
        if (!applyFilters(row, year, county, damage)) return;

        const structureType = row['Structure Category']?.trim();
        const dmg = damageMap[row['Damage']] ?? 0;
        if (!structureType) return;

        if (!structureDamageData[structureType]) {
          structureDamageData[structureType] = { totalDamage: 0, incidentCount: 0 };
        }

        structureDamageData[structureType].totalDamage += dmg;
        structureDamageData[structureType].incidentCount += 1;
      });

      const response = Object.entries(structureDamageData).map(([structureType, { totalDamage, incidentCount }]) => ({
        structureType,
        averageDamage: parseFloat((totalDamage / incidentCount).toFixed(2)),
        totalIncidents: incidentCount,
      }));

      res.json(response);
    });
};

exports.getIncidentsByCounty = (req, res) => {
  const results = [];
  const { year, county, damage } = req.query;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      const countyIncidents = {};

      results.forEach(row => {
        if (!applyFilters(row, year, county, damage)) return;

        const c = row['County']?.trim();
        if (!c) return;
        countyIncidents[c] = (countyIncidents[c] || 0) + 1;
      });

      const response = Object.entries(countyIncidents).map(([county, count]) => ({
        county,
        incidentCount: count
      }));

      res.json(response);
    });
};

exports.getDamageDistribution = (req, res) => {
  const results = [];
  const { year, county, damage } = req.query;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', row => results.push(row))
    .on('end', () => {
      const distribution = {};

      results.forEach(row => {
        if (!applyFilters(row, year, county, damage)) return;

        const d = row['Damage']?.trim();
        if (d) distribution[d] = (distribution[d] || 0) + 1;
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
  const { year, county, damage } = req.query;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      const heatmap = {};

      results.forEach(row => {
        if (!applyFilters(row, year, county, damage)) return;

        const month = row['Start Month Name']?.trim();
        const day = row['Start Day']?.trim();
        if (month && day) {
          if (!heatmap[day]) heatmap[day] = {};
          heatmap[day][month] = (heatmap[day][month] || 0) + 1;
        }
      });

      res.json(heatmap);
    });
};

exports.getFilterOptions = (req, res) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', row => results.push(row))
    .on('end', () => {
      const years = new Set();
      const counties = new Set();
      const damages = new Set();

      results.forEach(row => {
        if (row['Start Year']) years.add(row['Start Year']);
        if (row['County']) counties.add(row['County'].trim());
        if (row['Damage']) damages.add(row['Damage'].trim());
      });

      res.json({
        years: Array.from(years),
        counties: Array.from(counties),
        damageTypes: Array.from(damages)
      });
    });
};
