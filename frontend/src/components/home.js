import React from 'react';
import headerImg from './images/header2.jpg';
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
    <div style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', paddingBottom: '3rem' }}>
      <div style={{
        backgroundImage: `url(${headerImg})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 500,
        width: '100%'
      }} />
      <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
        <h2 style={{ color: '#f2c94c' }}>Welcome to the Wildfire Data Visualization Dashboard</h2>
        <p>
          This platform visualizes structure damage data from wildfire incidents across California.
          The damage severity is categorized from minor (1–10%) to complete destruction (50–100%),
          as assessed by field inspectors following wildland fires. The goal is to provide actionable
          insights for emergency responders, planners, and researchers to support fire prevention and response strategies.
        </p>
        <p style={{ fontStyle: 'italic', fontSize: '0.95rem', marginTop: '1.5rem' }}>
          Data Source: California Department of Forestry and Fire Protection (CAL FIRE), in collaboration with
          the National Interagency Fire Center (NIFC) and Fire Integrated Real-Time Intelligence System (FIRIS).
          Licensed under CC BY 4.0.
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Original Dataset:{' '}
          <a href="https://data.cnra.ca.gov/dataset/california-historical-fire-perimeters" target="_blank" rel="noopener noreferrer" style={{ color: '#cde000' }}>
            California Wildfire Perimeter Data
          </a>
        </p>
        <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Note: This dataset is provided “as-is” without warranty of accuracy or endorsement from the data providers. Please independently verify before use.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px', gap: '30px', paddingInline: '2rem' }}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => setPage(btn.target)}
            style={{
              width: '250px',
              height: '240px',
              backgroundColor: '#1a1a1a',
              border: '2px solid #888',
              borderTop: '4px solid #cde000',
              borderRadius: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              color: '#fff',
              padding: '1rem',
              textAlign: 'center',
              position: 'relative'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,255,255,0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,255,255,0.1)';
            }}
          >
            <img src={btn.image} alt={btn.label} style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '10px' }} />
            <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#cde000' }}>{btn.label}</span>
            <p style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '0.3rem' }}>
              {{
                'Explore EDA': 'Explore damage, location, and time patterns across wildfires.',
                'Run Predictions': 'Forecast hotspots, severity, and impacted zones.',
                'Make Decisions': 'Use insights to prioritize firefighting strategies.'
              }[btn.label]}
            </p>
          </button>
        ))}
      </div>

      <div style={{ marginTop: '3rem', padding: '1rem 2rem', maxWidth: '1000px', marginInline: 'auto' }}>
        <h3 style={{ color: '#f2c94c', marginBottom: '1rem', textAlign: 'center' }}>Key Features of the Dashboard</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            'Interactive EDA to explore incident and damage data by county, year, and structure type.',
            'Predictive analytics for forecasting wildfire hotspots, severity, and critical zones for 2025.',
            'Decision-making support with dynamic KPIs, visual maps, and risk prioritization tools.',
            'Custom-built charts including heatmaps, bar charts, and radar visuals for comparative insights.',
            'Responsive layout optimized for both desktop and tablet views.',
            'Colorblind-friendly design with high contrast and accessible styling.'
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'linear-gradient(to bottom, #1a1a1a, #111)',
              border: '1px solid #444',
              borderRadius: '10px',
              padding: '1.2rem',
              color: '#ccc',
              fontSize: '0.95rem',
              lineHeight: '1.5',
              boxShadow: '0 2px 10px rgba(255,255,255,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#aaa' }}>
        Curious about our mission or have suggestions to improve?{' '}
        <a href="/about" style={{ color: '#cde000', textDecoration: 'underline' }}>Learn more about us and share your feedback here</a>.
      </div>
    </div>
  );
};

export default Home;
