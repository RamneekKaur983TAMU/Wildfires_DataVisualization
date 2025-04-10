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
    <div style={{ padding: '2rem', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#ffcc80' }}>Prediction Dashboard</h2>

      <div style={{ marginTop: '1rem' }}>
        <PredictionKpiGrid data={kpiData} loading={loading} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}><ForecastMap /></div>
        <div style={{ flex: '1 1 25%', minWidth: '250px' }}><SeverityGauge /></div>
        <div style={{ flex: '1 1 25%', minWidth: '250px' }}><CountOverTime /></div>
        <div style={{ flex: '1 1 25%', minWidth: '250px' }}><IntensityDonut /></div>
        <div style={{ flex: '1 1 25%', minWidth: '250px' }}><RiskRadar /></div>
        <div style={{ flex: '1 1 100%' }}><ForecastTrends /></div>
      </div>
    </div>
  );
};

export default Predictions;
