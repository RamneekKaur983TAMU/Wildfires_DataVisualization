import React from 'react';
import fireIcon from './firedept.png';

const formatNumber = (value) => {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return value;
};

const kpiKeys = [
  { label: 'Predicted Hotspot', key: 'predictedHotspots' },
  { label: 'Predicted Severity', key: 'predictedSeverity' },
  { label: 'Predicted Time', key: 'predictedTime' },
  { label: 'Predicted Count', key: 'predictedCount' },
  { label: 'Estimated Severity Avg', key: 'estimatedSeverityAvg' },
  { label: 'Forecasted Street', key: 'forecastedStreet' }
];

const PredictionKpiGrid = ({ data, loading }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}
    >
      {kpiKeys.map((kpi, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#111',
            borderRadius: '8px',
            padding: '1rem',
            color: '#ffcc80',
            textAlign: 'center',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.1)',
            position: 'relative'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#ccc' }}>{kpi.label}</p>
          <h2 style={{ marginTop: '0.5rem', fontSize: '1.5rem', color: '#ff5722' }}>
            {loading ? '--' : formatNumber(data[kpi.key])}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default PredictionKpiGrid;
