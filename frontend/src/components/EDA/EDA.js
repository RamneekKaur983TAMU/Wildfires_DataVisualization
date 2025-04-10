import React, { useState, useEffect } from 'react';
import Header from '../Header';
import FilterSidebar from './FilterSidebar';
import KpiGrid from './KpiGrid';
import IncidentsByCountyChart from './IncidentsByCountyChart';
import CaliforniaFireMap from './CaliforniaFireMap';
import FiresOverTime from './FiresOverTime';
import HeatMapMonthvsDay from './HeatMapMonthvsDay';
import DamageVsFireIncidents from './DamageVsFireIncidents';
import StructureDamageChart from './StructureTypevsDamage';

const EDA = ({ setPage }) => {
  const [filters, setFilters] = useState({ year: '', area: '' });
  const [data, setData] = useState(null);
  const [damageByCounty, setDamageByCounty] = useState([]);
  const [incidentsByCounty, setIncidentsByCounty] = useState([]);

  const [fireData, setFireData]= useState({})
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

    const fetchFireData = async ()=>
    {
      const res = await fetch('http://localhost:8000/api/damage-trend');
      const result = await res.json();
      const formattedData = result.map((item) => ({
        year: item.year,  // Use 'year' as X-axis
        fires: item.fireCount,  // Use 'fireCount' for the Y-axis
      }));
      console.log(formattedData)
      setFireData(formattedData);
    }

    fetchChart();
    fetchFireData()

    const fetchIncidentsChart = async () => {
      const res = await fetch('http://localhost:8000/api/incidents-by-county');
      const result = await res.json();
      setIncidentsByCounty(result);
    };
    fetchIncidentsChart();

  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh' }}>
      <div style={{ display: 'flex', padding: '2rem' }}>
        <FilterSidebar filters={filters} onChange={setFilters} />
        <div style={{ flex: 1 }}>
          <KpiGrid data={data} />
          {/* Top row: California map + incidents & fires */}
<div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr', gap: '2rem', marginTop: '2rem' }}>
  <div>
    <CaliforniaFireMap />
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <IncidentsByCountyChart data={incidentsByCounty} />
    <FiresOverTime data={fireData} />
  </div>
</div>

{/* Full-width HeatMap */}
<div style={{ marginTop: '2rem' }}>
  <HeatMapMonthvsDay />
</div>

{/* Bottom row: two side-by-side charts */}
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  }}
>
  <DamageVsFireIncidents />
  <StructureDamageChart />
</div>

        </div>
      </div>
    </div>
  );
  
};

export default EDA;
