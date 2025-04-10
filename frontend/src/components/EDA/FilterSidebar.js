import React, { useState } from 'react';

const FilterSidebar = ({ filters, onChange, onSubmit }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(filters); // Call the onSubmit function passed from the parent with current filters
  };

  return (
    <div style={{ width: '220px', marginRight: '2rem' }}>
      <h4 style={{ color: '#ffcc80' }}>Filters</h4>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Year</label>
          <select
            name="year"
            value={filters.year}
            onChange={handleChange}
            style={{ width: '100%', marginTop: '0.25rem' }}
          >
            <option value="">All</option>
            {[2020, 2021, 2022, 2023].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Area</label>
          <select
            name="area"
            value={filters.area}
            onChange={handleChange}
            style={{ width: '100%', marginTop: '0.25rem' }}
          >
            {['', 'Solano', 'Los Angeles', 'Butte', 'Sonoma'].map((area) => (
              <option key={area} value={area}>
                {area || 'All'}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button type="submit" style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#ff5722',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
          }}>
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterSidebar;
