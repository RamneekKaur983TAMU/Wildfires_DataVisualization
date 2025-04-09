import React, { useState } from 'react';
import Header from './header';

const EDA = ({ setPage }) => {
  const [filters, setFilters] = useState({ year: '', area: '' });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
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
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div>
          <label>Area</label>
          <select name="area" value={filters.area} onChange={handleFilterChange} style={{ width: '100%', marginTop: '0.25rem' }}>
            <option value="">All</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Butte">Butte</option>
            <option value="Sonoma">Sonoma</option>
          </select>
        </div>
      </div>

      {/* Main Visualization Content */}
      <div style={{ flex: 1 }}>
        {/* KPI Row */}
        <h3>Key Performance Indicators (KPIs)</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {['Total Incidents', 'Avg Damage %', 'Structures Destroyed', 'Most Affected Area', 'Most Active Year', 'Total Value Loss'].map((title, i) => (
            <div key={i} style={{
              backgroundColor: '#111',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa' }}>{title}</p>
              <h2 style={{ margin: 0, marginTop: '0.5rem', color: '#ff5722' }}>--</h2>
            </div>
          ))}
        </div>

        {/* Map + Charts */}
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem', gap: '1.5rem' }}>
          <div style={{ flex: '1 1 400px', minHeight: '300px', backgroundColor: '#111', borderRadius: '8px', padding: '1rem', color: '#ffcc80' }}>
            <h4>California Fire Map</h4>
            <div style={{ height: '250px', backgroundColor: '#222' }}>[Map Placeholder]</div>
          </div>
          {['Damage % by County', 'Fires Over Time', 'Structures Impacted by Year', 'Loss Value Distribution'].map((title, i) => (
            <div key={i} style={{ flex: '1 1 400px', minHeight: '300px', backgroundColor: '#111', borderRadius: '8px', padding: '1rem', color: '#ffcc80' }}>
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
