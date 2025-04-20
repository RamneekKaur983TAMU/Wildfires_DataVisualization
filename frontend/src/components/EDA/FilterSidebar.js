import React from 'react';

const FilterSidebar = ({ filters, onChange, options }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const commonStyle = {
    width: '100%',
    marginTop: '0.25rem',
    backgroundColor: '#111',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '4px',
    padding: '0.25rem'
  };

  return (
    <div style={{ width: '220px', marginRight: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#ccc' }}>Year</label>
        <select
          name="year"
          value={filters.year}
          onChange={handleChange}
          style={commonStyle}
        >
          <option value="">All</option>
          {options.years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#ccc' }}>County</label>
        <select
          name="county"
          value={filters.county}
          onChange={handleChange}
          style={commonStyle}
        >
          <option value="">All</option>
          {options.counties.map((county) => (
            <option key={county} value={county}>{county}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#ccc' }}>Damage</label>
        <select
          name="damage"
          value={filters.damage}
          onChange={handleChange}
          style={commonStyle}
        >
          <option value="">All</option>
          {options.damageTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
