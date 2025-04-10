import React from 'react';

const FilterSidebar = ({ filters, onChange }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ width: '220px', marginRight: '2rem' }}>
      <h4 style={{ color: '#ffcc80' }}>Filters</h4>
      <div style={{ marginBottom: '1rem' }}>
        <label>Year</label>
        <select name="year" value={filters.year} onChange={handleChange} style={{ width: '100%', marginTop: '0.25rem' }}>
          <option value="">All</option>
          {[2020, 2021, 2022, 2023].map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
      <div>
        <label>Area</label>
        <select name="area" value={filters.area} onChange={handleChange} style={{ width: '100%', marginTop: '0.25rem' }}>
          {['', 'Solano', 'Los Angeles', 'Butte', 'Sonoma'].map(area => (
            <option key={area} value={area}>{area || 'All'}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
