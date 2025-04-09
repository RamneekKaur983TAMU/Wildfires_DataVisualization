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
    <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh', paddingBottom: '3rem' }}>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Welcome to the Wildfire Data Visualization Dashboard</h2>
        <p>
          This platform visualizes structure damage data from wildfire incidents across California. 
          The damage severity is categorized from minor (1–10%) to complete destruction (50–100%), as assessed 
          by field inspectors following wildland fires. The goal is to provide actionable insights for 
          emergency responders, planners, and researchers to support fire prevention and response strategies.
        </p>
        <p style={{ fontStyle: 'italic', fontSize: '0.95rem', marginTop: '1.5rem' }}>
          Data Source: California Department of Forestry and Fire Protection (CAL FIRE), in collaboration with 
          the National Interagency Fire Center (NIFC) and Fire Integrated Real-Time Intelligence System (FIRIS). 
          Licensed under CC BY 4.0.
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Original Dataset:{' '}
          <a href="https://data.cnra.ca.gov/dataset/california-historical-fire-perimeters" target="_blank" rel="noopener noreferrer" style={{ color: '#ffcc80' }}>
            California Wildfire Perimeter Data
          </a>
        </p>
        <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Note: This dataset is provided “as-is” without warranty of accuracy or endorsement from the data providers. Please independently verify before use.
        </p>
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
              height: '200px',
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
            <img src={btn.image} alt={btn.label} style={{ width: '120px', height: '120px', marginBottom: '10px' }} />
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
