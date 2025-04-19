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
    <div style={{
      backgroundColor: '#000',
      color: 'white',
      minHeight: 'calc(100vh - 60px)',
      padding: '0rem',
      display: 'grid',
      gridTemplateColumns: '0.8fr 2.4fr 0.8fr',
      gridTemplateRows: 'auto auto auto',
      gap: '0rem',
      gridTemplateAreas: `
        "kpis charts detail"
        "kpis charts detail"
        "kpis charts detail"
        "kpis charts detail"
      `
    }}>
      <div style={{ gridArea: 'kpis', marginBottom: '1rem', fontSize: '90%', backgroundColor: '#111', padding: '1rem', borderRadius: '8px', width: '80%' }}>
        <h3 style={{ color: '#ffcc80', marginBottom: '0.5rem' }}>Key Performance Indicators</h3>
        <KpiGrid data={data} />
      </div>

      <div style={{ gridArea: 'charts', backgroundColor: '#111', padding: '0', borderRadius: '8px', display: 'grid', gap: '0', gridTemplateRows: 'auto auto auto', gridTemplateColumns: '1.4fr 1.6fr', gridTemplateAreas: `
        "map charts"
        "bottom bottom"
        "heat heat"
      ` }}>
        <div style={{ gridArea: 'map', backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}>
          <CaliforniaFireMap />
        </div>
        <div style={{ gridArea: 'charts', display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0' }}>
          <div style={{ backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', height: '300px', width: '100%' }}>
            <IncidentsByCountyChart data={incidentsByCounty} />
          </div>
          <div style={{ backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', height: '240px', width: '100%' }}>
            <FiresOverTime data={fireData} />
          </div>
        </div>
        <div style={{ gridArea: 'bottom', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem', marginTop: '1.5rem' , height: '450px'}}>
          <div style={{ backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', height: '200px', width: '100%' }}>
            <DamageVsFireIncidents />
          </div>
          <div style={{ backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', height: '200px', width: '100%' }}>
            <StructureDamageChart />
          </div>
        </div>
        <div style={{
          gridArea: 'heat',
          backgroundColor: '#1a1a1a',
          padding: '0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          height: '220px'
        }}>
          <HeatMapMonthvsDay />
        </div>
      </div>

      <div style={{ gridArea: 'detail', backgroundColor: '#1c1c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '80%' }}>
        <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <h4 style={{ color: '#ffcc80' }}>Filters</h4>
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>
        <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ color: '#ffcc80' }}>Insights</h4>
          <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
            The number of incidents has steadily increased over the years, with Los Angeles county reporting the highest average damage. The KPIs to the left summarize total incidents, cities affected, structures damaged, and financial losses.
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default EDA;
