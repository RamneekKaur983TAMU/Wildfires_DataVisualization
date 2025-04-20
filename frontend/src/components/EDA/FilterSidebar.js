import React from 'react';

const FilterSidebar = ({ filters, onChange, options }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ width: '220px', marginRight: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ color: '#ccc' }}>Year</label>
        <select
          name="year"
          value={filters.year}
          onChange={handleChange}
          style={{ width: '100%', marginTop: '0.25rem' }}
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
          style={{ width: '100%', marginTop: '0.25rem' }}
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
          style={{ width: '100%', marginTop: '0.25rem' }}
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
