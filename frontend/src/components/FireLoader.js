import React from 'react';

const FireLoader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: '2rem',
  }}>
    <img src="fire-loader.gif" alt="Loading fire gif..." style={{ width: '120px', height: '120px' }} />
    <p style={{ color: '#ff5722', fontSize: '1.2rem', marginTop: '1rem' }}>Loading data...</p>
  </div>
);

export default FireLoader;

