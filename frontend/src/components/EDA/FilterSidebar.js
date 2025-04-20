import React, { useState, useEffect, useRef } from 'react';

const FilterSidebar = ({ filters, onChange, options }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [tempFilters, setTempFilters] = useState(filters); // local state
  const containerRef = useRef(null);

  useEffect(() => {
    setTempFilters(filters); // sync external changes to local state
  }, [filters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (field) => {
    setOpenDropdown(openDropdown === field ? null : field);
  };

  const handleCheckboxChange = (field, value) => {
    const currentValues = tempFilters[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setTempFilters({ ...tempFilters, [field]: updatedValues });
  };

  const handleDamageChange = (e) => {
    setTempFilters({ ...tempFilters, damage: e.target.value });
  };

  const applyFilters = () => {
    onChange(tempFilters); // apply filters only when user clicks the button
  };

  const dropdownStyle = {
    position: 'absolute',
    backgroundColor: '#1a1a1a',
    border: '1px solid #555',
    borderRadius: '6px',
    padding: '0.5rem',
    maxHeight: '150px',
    overflowY: 'auto',
    zIndex: 10,
    marginTop: '0.25rem',
    width: '100%',
  };

  const labelStyle = {
    color: '#ffcc80',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  };

  const dropdownBoxStyle = {
    width: '100%',
    padding: '0.4rem',
    backgroundColor: '#111',
    color: '#ccc',
    border: '1px solid #444',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '0.25rem',
    textAlign: 'left'
  };

  const selectedText = (field) => {
    const values = tempFilters[field] || [];
    if (values.length === 0) return 'Select...';
    return values.join(', ');
  };

  return (
    <div style={{ width: '220px', marginRight: '2rem' }} ref={containerRef}>
      {/* Year Dropdown */}
      <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
        <label style={labelStyle}>Year</label>
        <div onClick={() => toggleDropdown('year')} style={dropdownBoxStyle}>
          {selectedText('year')}
        </div>
        {openDropdown === 'year' && (
          <div style={dropdownStyle}>
            {options.years.map((year) => (
              <div key={year}>
                <label style={{ color: '#fff' }}>
                  <input
                    type="checkbox"
                    checked={(tempFilters.year || []).includes(year)}
                    onChange={() => handleCheckboxChange('year', year)}
                  />{' '}
                  {year}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* County Dropdown */}
      <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
        <label style={labelStyle}>County</label>
        <div onClick={() => toggleDropdown('county')} style={dropdownBoxStyle}>
          {selectedText('county')}
        </div>
        {openDropdown === 'county' && (
          <div style={dropdownStyle}>
            {options.counties.map((county) => (
              <div key={county}>
                <label style={{ color: '#fff' }}>
                  <input
                    type="checkbox"
                    checked={(tempFilters.county || []).includes(county)}
                    onChange={() => handleCheckboxChange('county', county)}
                  />{' '}
                  {county}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Damage Dropdown */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Damage</label>
        <select
          name="damage"
          value={tempFilters.damage}
          onChange={handleDamageChange}
          style={{
            width: '100%',
            marginTop: '0.25rem',
            backgroundColor: '#111',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: '6px',
            padding: '0.4rem'
          }}
        >
          <option value="">All</option>
          {options.damageTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Filter Button */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={applyFilters}
          style={{
            backgroundColor: '#ffcc80',
            color: '#111',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            width: '100%'
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
