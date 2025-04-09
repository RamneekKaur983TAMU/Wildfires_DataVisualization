const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

exports.getSummary = (req, res) => {
  const results = [];

  const filePath = path.join(__dirname, '..', 'datasets', 'TransformedData.csv');

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

      // Damage estimation
      const damageMap = {
        'No Damage': 0,
        'Affected (1-9%)': 5,
        'Affected (10-25%)': 17.5,
        'Affected (26-50%)': 38,
        'Affected (51-74%)': 62.5,
        'Affected (75-100%)': 87.5,
        'Destroyed': 100
      };

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

      // Optional debug log
      console.log({
        totalIncidents,
        totalCities,
        highestFireDate,
        mostDamagedYear,
        mostAffectedCity,
        mostAffectedStreet
      });

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
