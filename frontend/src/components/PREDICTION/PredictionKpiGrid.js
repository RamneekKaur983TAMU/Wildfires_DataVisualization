import React from 'react';

const PredictionKpiGrid = ({ data, loading }) => {
  const kpis = [
    { label: 'Predicted Hotspots', value: data.predictedHotspots },
    { label: 'Predicted Severity', value: data.predictedSeverity },
    { label: 'Predicted Time', value: data.predictedTime },
    { label: 'Predicted Count', value: data.predictedCount }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}
    >
      {kpis.map((kpi, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#111',
            borderRadius: '8px',
            padding: '1rem',
            color: '#ffcc80',
            textAlign: 'center',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.1)'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#ccc' }}>{kpi.label}</p>
          <h2 style={{ marginTop: '0.5rem', fontSize: '1.5rem', color: '#ff5722' }}>
            {loading ? '--' : kpi.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default PredictionKpiGrid;
