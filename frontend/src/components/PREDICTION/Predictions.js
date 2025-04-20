import React, { useEffect, useState } from 'react';
import PredictionKpiGrid from './PredictionKpiGrid';
import ForecastMap from './ForecastMap';
import SeverityGauge from './SeverityGauge';
import CountOverTime from './CountOverTime';
import IntensityDonut from './IntensityDonut';
import RiskRadar from './RiskRadar';
import ForecastTrends from './ForecastTrends';

const Predictions = ({ setPage }) => {
  const [kpiData, setKpiData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/summary')
      .then(res => res.json())
      .then(data => {
        setKpiData(data);
        setLoading(false);
      });
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
        <h3 style={{ color: '#ffcc80', marginBottom: '0.5rem' }}>Forecast KPIs</h3>
        <PredictionKpiGrid data={kpiData} loading={loading} />
      </div>

      <div style={{ gridArea: 'charts', backgroundColor: '#111', padding: '0', borderRadius: '8px', display: 'grid', gap: '0', gridTemplateRows: 'auto auto auto', gridTemplateColumns: '1.4fr 1.6fr', gridTemplateAreas: `
        "map charts"
        "bottom bottom"
        "trend trend"
      ` }}>
        <div style={{ gridArea: 'map', backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px' }}>
          <ForecastMap />
        </div>
        <div style={{ gridArea: 'charts', display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0' }}>
          <div style={{ backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', height: '300px', width: '100%' }}>
            <SeverityGauge />
          </div>
          <div style={{ backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', height: '240px', width: '100%' }}>
            <CountOverTime />
          </div>
        </div>
        <div style={{ gridArea: 'bottom', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem', marginTop: '1.5rem', height: '450px' }}>
          <div style={{ backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', height: '200px', width: '100%' }}>
            <IntensityDonut />
          </div>
          <div style={{ backgroundColor: '#1a1a1a', padding: '0', borderRadius: '8px', height: '200px', width: '100%' }}>
            <RiskRadar />
          </div>
        </div>
        <div style={{
          gridArea: 'trend',
          backgroundColor: '#1a1a1a',
          padding: '0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          height: '220px'
        }}>
          <ForecastTrends />
        </div>
      </div>

      <div style={{ gridArea: 'detail', backgroundColor: '#1c1c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%', width: '80%' }}>
        <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ color: '#ffcc80' }}>Insights</h4>
          <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
            The predictions reflect expected hotspots, severity, and resource allocation zones for 2025. The visualizations assist emergency teams in anticipating critical regions and acting proactively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Predictions;
