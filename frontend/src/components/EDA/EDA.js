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
  const [filters, setFilters] = useState({
    year: [],
    county: [],
    damage: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    years: [],
    counties: [],
    damageTypes: []
  });

  const buildQuery = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => {
          if (val) params.append(key, val);
        });
      } else {
        if (value) params.append(key, value);
      }
    });
    return params.toString();
  };

  const [data, setData] = useState(null);
  const [damageByCounty, setDamageByCounty] = useState([]);
  const [incidentsByCounty, setIncidentsByCounty] = useState([]);
  const [fireData, setFireData] = useState([]);
  const [fireMapData, setFireMapData] = useState([]);
  const [heatmapData, setHeatmapData] = useState({});
  const [damageDistributionData, setDamageDistributionData] = useState([]);
  const [structureDamageData, setStructureDamageData] = useState([]);

  useEffect(() => {
    const fetchKpis = async () => {
      const query = buildQuery(filters);
      const res = await fetch(`http://localhost:8000/api/summary?${query}`);
      const result = await res.json();
      setData(result);
    };
    fetchKpis();
  }, [filters]);

  useEffect(() => {
    const query = buildQuery(filters);

    const fetchChart = async () => {
      const res = await fetch(`http://localhost:8000/api/damage-by-county?${query}`);
      const result = await res.json();
      setDamageByCounty(result);
    };

    const fetchFireData = async () => {
      const res = await fetch(`http://localhost:8000/api/damage-trend?${query}`);
      const result = await res.json();
      const formattedData = result.map((item) => ({
        year: item.year,
        fires: item.fireCount,
      }));
      setFireData(formattedData);
    };

    const fetchIncidentsChart = async () => {
      const res = await fetch(`http://localhost:8000/api/incidents-by-county?${query}`);
      const result = await res.json();
      setIncidentsByCounty(result);
    };

    const fetchFireMapData = async () => {
      const res = await fetch(`http://localhost:8000/api/fire-map-by-county?${query}`);
      const result = await res.json();
      setFireMapData(result);
    };

    const fetchHeatmapData = async () => {
      const res = await fetch(`http://localhost:8000/api/heatmap-data?${query}`);
      const result = await res.json();
      setHeatmapData(result);
    };

    const fetchDamageDistribution = async () => {
      const res = await fetch(`http://localhost:8000/api/damage-distribution?${query}`);
      const result = await res.json();
      setDamageDistributionData(result);
    };

    const fetchStructureDamageData = async () => {
      const res = await fetch(`http://localhost:8000/api/getStructureTypeDamageSummary?${query}`);
      const result = await res.json();
      setStructureDamageData(result);
    };

    fetchChart();
    fetchFireData();
    fetchIncidentsChart();
    fetchFireMapData();
    fetchHeatmapData();
    fetchDamageDistribution();
    fetchStructureDamageData();
  }, [filters]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const res = await fetch('http://localhost:8000/api/filter-options');
      const result = await res.json();
      setFilterOptions({
        years: result.years.sort(),
        counties: result.counties.sort(),
        damageTypes: result.damageTypes.sort(),
      });
    };
    fetchFilterOptions();
  }, []);

  return (
    <>
      <div style={{
        textAlign: 'center',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.15rem',
        fontWeight: 'bold',
        color: '#f2c94c',
        fontFamily: 'inherit'
      }}>
        Exploratory Data Analysis Dashboard - For Understanding Fire Incidents and Patterns
      </div>
      <div style={{
        backgroundColor: '#000',
        color: 'white',
        minHeight: 'calc(100vh - 60px)',
        padding: '0rem',
        display: 'grid',
        gridTemplateColumns: '0.8fr 2.4fr 0.8fr',
        gap: '2rem',
        gridTemplateAreas: `
          "kpis charts detail"
          "kpis charts detail"
          "kpis charts detail"
          "kpis charts detail"
        `
      }}>
      <div style={{
        gridArea: 'kpis',
        marginBottom: '1rem',
        marginLeft: '1.5rem',
        fontSize: '90%',
        backgroundColor: '#111',
        padding: '1rem',
        borderRadius: '8px',
        width: '80%'
      }}>
        <h3 style={{ color: '#ffcc80', marginTop: '1.3rem', marginBottom: '0.5rem' }}>Key Performance Indicators</h3>
        <KpiGrid data={data} />
      </div>

      <div style={{
        gridArea: 'charts',
        backgroundColor: '#111',
        padding: '0',
        borderRadius: '8px',
        display: 'grid',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '0'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateRows: 'auto auto auto',
          gridTemplateColumns: '1.4fr 1.6fr',
          gap: '0',
          gridTemplateAreas: `
            "map charts"
            "bottom bottom"
            "heat heat"
          `
        }}>
          <div style={{ gridArea: 'map' }}>
            <CaliforniaFireMap data={fireMapData} />
          </div>
          <div style={{ gridArea: 'charts', display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0' }}>
            <div style={{ height: '300px' }}>
              <IncidentsByCountyChart data={incidentsByCounty} />
            </div>
            <div style={{ height: '240px' }}>
              <FiresOverTime data={fireData} />
            </div>
          </div>
          {/* <div style={{ gridArea: 'bottom', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem', marginTop: '1.5rem', height: '450px' }}>
            <div style={{ height: '200px' }}>
              <DamageVsFireIncidents data={damageDistributionData} />
            </div>
            <div style={{ height: '200px' }}>
              <StructureDamageChart data={structureDamageData} />
            </div>
          </div> */}

          <div style={{
            gridArea: 'bottom',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.25rem',
            marginTop: '1.5rem',
            height: '450px'
          }}>
            <div style={{
              backgroundColor: '#111',
              padding: '0',
              borderRadius: '8px',
              height: '200px',
              width: '100%'
            }}>
              <DamageVsFireIncidents data={damageDistributionData} />
            </div>
            <div style={{
              backgroundColor: '#111',
              padding: '0',
              borderRadius: '8px',
              height: '200px',
              width: '100%',
              marginLeft: '-1.7rem'
            }}>
              <StructureDamageChart data={structureDamageData} />
            </div>
          </div>
          
          <div style={{ gridArea: 'heat', height: '220px' }}>
            <HeatMapMonthvsDay data={heatmapData} />
          </div>
        </div>
      </div>

      <div style={{
        gridArea: 'detail',
        backgroundColor: '#111',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '80%'
      }}>
        <div style={{ backgroundColor: '#111', padding: '0rem', borderRadius: '8px' }}>
          <h4 style={{ color: '#ffcc80' }}>Filters</h4>
          <FilterSidebar filters={filters} onChange={setFilters} options={filterOptions} />
        </div>
        <div style={{ backgroundColor: '#111', padding: '0rem', borderRadius: '8px' }}>
          <h4 style={{ color: '#ffcc80' }}>Insights</h4>
          <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
            The number of incidents has steadily increased over the years, with Los Angeles county reporting the highest average damage. The KPIs to the left summarize total incidents, cities affected, structures damaged, and financial losses.
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default EDA;
