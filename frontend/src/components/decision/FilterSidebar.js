import React from 'react';

const FilterSidebar = ({ filters, onChange, options }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <select name="year" value={filters.year} onChange={handleChange}>
        <option value="">All Years</option>
        {options.years.map((y, idx) => <option key={idx} value={y}>{y}</option>)}
      </select>

      <select name="county" value={filters.county} onChange={handleChange}>
        <option value="">All Counties</option>
        {options.counties.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
      </select>

      <select name="damage" value={filters.damage} onChange={handleChange}>
        <option value="">All Damage Levels</option>
        {options.damageTypes.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
      </select>
    </div>
  );
};

export default FilterSidebar;
