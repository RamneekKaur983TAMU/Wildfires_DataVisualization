import React from 'react';
import fireIcon from './firedept.png';

const formatNumber = (value, isPercentage = false) => {
  if (typeof value === 'number') {
    return isPercentage ? value.toFixed(1) + '%' : value.toLocaleString();
  }
  return value;
};

const kpiKeys = [
  { label: 'Predicted Hotspot', key: 'predictedHotspot' },
  { label: 'Predicted Severity', key: 'predictedSeverity' },
  { label: 'Predicted Time', key: 'predictedTime' },
  { label: 'Predicted Count', key: 'predictedCount' },
  { label: 'Estimated Severity %', key: 'estimatedSeverityAvg' },
  { label: 'Forecasted Street', key: 'forecastedStreet' }
];

const PredictionKpiGrid = ({ data, loading }) => {
  if (!data) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    }}>
      {kpiKeys.map((kpi, index) => (
        <div key={index} style={{
          backgroundColor: '#111',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa' }}>{kpi.label}</p>
          <h2 style={{ margin: 0, marginTop: '0.5rem', color: '#ff5722' }}>
            {loading ? '--' : formatNumber(data[kpi.key], kpi.key === 'estimatedSeverityAvg')}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default PredictionKpiGrid;
