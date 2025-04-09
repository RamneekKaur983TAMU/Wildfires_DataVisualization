const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 4000;
const CSV_PATH = './datasets/TransformedData.csv';

app.use(cors());

function loadData(callback) {
  const results = [];
  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => callback(results));
}

app.get('/api/summary', (req, res) => {
  const { year, area } = req.query;

  loadData((data) => {
    let filtered = data;

    if (year) filtered = filtered.filter(d => d['Start Year'] === year);
    if (area) filtered = filtered.filter(d => (d['City'] || '').toLowerCase() === area.toLowerCase());

    const totalIncidents = filtered.length;

    const citySet = new Set(data.map(d => (d['City'] || '').trim().toLowerCase()).filter(city => city));
    const totalCities = citySet.size;

    const dateCounts = {};
    filtered.forEach(d => {
      const date = d['Incident Start Date'];
      if (date) dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    const highestFireDate = Object.entries(dateCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const yearDamage = {};
    filtered.forEach(d => {
      const year = d['Start Year'];
      const damage = parseFloat(d['Damage']) || 0;
      if (year) yearDamage[year] = (yearDamage[year] || 0) + damage;
    });
    const mostDamagedYear = Object.entries(yearDamage).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const cityCounts = {};
    filtered.forEach(d => {
      const city = d['City'];
      if (city) cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
    const mostAffectedCity = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const streetCounts = {};
    filtered.forEach(d => {
      const street = d['Street Name'];
      if (street) streetCounts[street] = (streetCounts[street] || 0) + 1;
    });
    const mostAffectedStreet = Object.entries(streetCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    res.json({
      totalIncidents: totalIncidents.toString(),
      totalCities: totalCities.toString(),
      highestFireDate: highestFireDate.toString(),
      mostDamagedYear: mostDamagedYear.toString(),
      mostAffectedCity: mostAffectedCity.toString(),
      mostAffectedStreet: mostAffectedStreet.toString()
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});