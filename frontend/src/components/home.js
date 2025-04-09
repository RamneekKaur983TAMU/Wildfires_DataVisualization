import React from 'react';
import edaImg from './images/eda.jpeg';
import predictionsImg from './images/predictions.jpeg';
import decisionsImg from './images/decisions.jpeg';

const Home = ({ setPage }) => {
  const buttons = [
    { label: 'Explore EDA', target: 'eda', image: edaImg },
    { label: 'Run Predictions', target: 'predictions', image: predictionsImg },
    { label: 'Make Decisions', target: 'decision', image: decisionsImg }
  ];

  return (
    <div>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Welcome to the Wildfire Data Visualization Dashboard</h2>
        <p>This tool helps you explore historical wildfire data, visualize predictive insights, and support informed decision making using interactive visual analytics.</p>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '20px',
        gap: '30px'
      }}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => setPage(btn.target)}
            style={{
              width: '220px',
              height: '180px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0px 6px 15px rgba(0,0,0,0.2)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <img src={btn.image} alt={btn.label} style={{ width: '80px', height: '80px', marginBottom: '10px' }} />
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
