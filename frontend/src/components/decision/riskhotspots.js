import React from 'react';

const RiskHotspots = ({ data = [] }) => {
  return (
    <div style={{ padding: '1rem', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff' }}>
      <h3 style={{ color: '#ffcc80' }}>Ongoing Live Fire</h3>
      <div style={{ width: '100%', height: '500px', marginTop: '1rem' }}>
        <iframe
          src="https://www.fire.ca.gov/incidents.html"
          title="Cal Fire Incidents"
          width="100%"
          height="100%"
          style={{ border: 'none', borderRadius: '6px' }}
        />
      </div>
    </div>
  );
};

export default RiskHotspots;
