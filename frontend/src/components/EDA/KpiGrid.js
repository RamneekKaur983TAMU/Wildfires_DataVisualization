import React from 'react';

const kpiKeys = {
  'Total Incidents': 'totalIncidents',
  'Total Cities': 'totalCities',
  'Highest Fires Date': 'highestFireDate',
  'Most Damaged Year': 'mostDamagedYear',
  'Most Affected City': 'mostAffectedCity',
  'Most Affected Street': 'mostAffectedStreet'
};

const formatNumber = (value, isPercentage = false) => {
  const num = parseFloat(value);
  if (isNaN(num)) return '--';
  if (isPercentage) return num.toFixed(1) + '%';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
};

const KpiGrid = ({ data }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  }}>
    {Object.keys(kpiKeys).map((title, i) => (
      <div key={i} style={{
        backgroundColor: '#111',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(255,255,255,0.1)',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa' }}>{title}</p>
        <h2 style={{ margin: 0, marginTop: '0.5rem', color: '#ff5722' }}>
          {data
            ? ['Total Incidents', 'Total Cities'].includes(title)
              ? formatNumber(data[kpiKeys[title]])
              : data[kpiKeys[title]] || '--'
            : '--'}
        </h2>
      </div>
    ))}
  </div>
);

export default KpiGrid;
