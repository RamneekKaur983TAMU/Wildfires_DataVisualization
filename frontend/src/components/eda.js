import React, { useState, useEffect } from 'react';
import Header from './Header';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const EDA = ({ setPage }) => {
  const [filters, setFilters] = useState({ year: '', area: '' });
  const [data, setData] = useState(null);
  const [damageByCounty, setDamageByCounty] = useState([]);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const query = new URLSearchParams();
        if (filters.year) query.append('year', filters.year);
        if (filters.area) query.append('area', filters.area);

        const res = await fetch(`http://localhost:8000/api/summary?${query.toString()}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch KPI data', error);
      }
    };

    fetchKpis();
  }, [filters]);

  useEffect(() => {
    const fetchDamageChart = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/damage-by-county');
        const chartData = await res.json();
        setDamageByCounty(chartData);
      } catch (error) {
        console.error('Failed to fetch damage chart data', error);
      }
    };

    fetchDamageChart();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const kpiKeys = {
    'Total Incidents': 'totalIncidents',
    'Total Cities': 'totalCities',
    'Highest Fires Date': 'highestFireDate',
    'Most Damaged Year': 'mostDamagedYear',
    'Most Affected City': 'mostAffectedCity',
    'Most Affected Street': 'mostAffectedStreet'
  };

  const formatNumber = (value, isPercentage = false) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '--';
    if (isPercentage) return num.toFixed(1) + '%';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh' }}>
      <div style={{ display: 'flex', padding: '2rem' }}>
        {/* Sidebar filters */}
        <div style={{ width: '220px', marginRight: '2rem' }}>
          <h4 style={{ color: '#ffcc80' }}>Filters</h4>
          <div style={{ marginBottom: '1rem' }}>
            <label>Year</label>
            <select name="year" value={filters.year} onChange={handleFilterChange} style={{ width: '100%', marginTop: '0.25rem' }}>
              <option value="">All</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div>
            <label>Area</label>
            <select name="area" value={filters.area} onChange={handleFilterChange} style={{ width: '100%', marginTop: '0.25rem' }}>
              <option value="">All</option>
              <option value="Solano">Solano</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Butte">Butte</option>
              <option value="Sonoma">Sonoma</option>
            </select>
          </div>
        </div>

        {/* Main Visualization Content */}
        <div style={{ flex: 1 }}>
          <h3>Key Performance Indicators (KPIs)</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {Object.keys(kpiKeys).map((title, i) => (
              <div key={i} style={{
                backgroundColor: '#111',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa' }}>{title}</p>
                <h2 style={{ margin: 0, marginTop: '0.5rem', color: '#ff5722' }}>
                  {data
                    ? ['Total Incidents', 'Total Cities'].includes(title)
                      ? formatNumber(data[kpiKeys[title]])
                      : data[kpiKeys[title]] || '--'
                    : '--'}
                </h2>
              </div>
            ))}
          </div>

          {/* Map + Charts */}
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem', gap: '1.5rem' }}>
            <div style={{
              flex: '1 1 400px',
              minHeight: '300px',
              backgroundColor: '#111',
              borderRadius: '8px',
              padding: '1rem',
              color: '#ffcc80'
            }}>
              <h4>California Fire Map</h4>
              <div style={{ height: '250px', backgroundColor: '#222' }}>[Map Placeholder]</div>
            </div>

            {/* Damage % by County Bar Chart */}
            <div style={{
              flex: '1 1 400px',
              minHeight: '300px',
              backgroundColor: '#111',
              borderRadius: '8px',
              padding: '1rem',
              color: '#ffcc80'
            }}>
              <h4>Damage % by County</h4>
              <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
                {damageByCounty.length === 0 ? (
                  <p style={{ color: '#aaa' }}>Loading...</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={damageByCounty
                        .sort((a, b) => b.averageDamage - a.averageDamage)
                        .slice(0, 15)}
                      margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="county" angle={-45} textAnchor="end" interval={0} tick={{ fill: '#ccc', fontSize: 12 }} />
                      <YAxis
                        tick={{ fill: '#ccc' }}
                        domain={[0, Math.ceil(Math.max(...damageByCounty.map(c => c.averageDamage)))]}
                      />
                      <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }} />
                      <Bar dataKey="averageDamage" fill="#ff5722" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Other chart placeholders */}
            {['Fires Over Time', 'Structures Impacted by Year', 'Loss Value Distribution'].map((title, i) => (
              <div key={i} style={{
                flex: '1 1 400px',
                minHeight: '300px',
                backgroundColor: '#111',
                borderRadius: '8px',
                padding: '1rem',
                color: '#ffcc80'
              }}>
                <h4>{title}</h4>
                <div style={{ height: '250px', backgroundColor: '#222' }}>[Chart Placeholder]</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EDA;
