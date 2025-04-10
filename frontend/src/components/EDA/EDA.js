import React, { useState, useEffect } from 'react';
import Header from '../header';
import FilterSidebar from './FilterSidebar';
import KpiGrid from './KpiGrid';
import DamageByCountyChart from './DamageByCountyChart';
import CaliforniaFireMap from './CaliforniaFireMap';
import FiresOverTime from './FiresOverTime';
import StructuresImpactedbyYear from './StructuresImpactedbyYear';
import LossValueDistribution from './LossValueDistribution';

const EDA = ({ setPage }) => {
  const [filters, setFilters] = useState({ year: '', area: '' });
  const [data, setData] = useState(null);
  const [damageByCounty, setDamageByCounty] = useState([]);

  useEffect(() => {
    const fetchKpis = async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:8000/api/summary?${query}`);
      const result = await res.json();
      setData(result);
    };
    fetchKpis();
  }, [filters]);

  useEffect(() => {
    const fetchChart = async () => {
      const res = await fetch('http://localhost:8000/api/damage-by-county');
      const result = await res.json();
      setDamageByCounty(result);
    };
    fetchChart();
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh' }}>
      <div style={{ display: 'flex', padding: '2rem' }}>
        <FilterSidebar filters={filters} onChange={setFilters} />
        <div style={{ flex: 1 }}>
          <KpiGrid data={data} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2rem' }}>
            <CaliforniaFireMap />
            <DamageByCountyChart data={damageByCounty} />
            <FiresOverTime />
            <StructuresImpactedbyYear />
            <LossValueDistribution />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EDA;
