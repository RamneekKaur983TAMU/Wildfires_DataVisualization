import React from 'react';
import teamLogo from './images/teamlogo.jpeg';

const Header = ({ setPage, activePage }) => {
  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'EDA', value: 'eda' },
    { label: 'Predictions', value: 'predictions' },
    { label: 'Decision Making', value: 'decision' },
    { label: 'About Us', value: 'about' }
  ];

  return (
    <>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 30px',
        height: '50px',
        backgroundColor: '#111',
        borderBottom: '2px solid #333',
        color: 'white',
        fontFamily: 'Segoe UI, Tahoma, sans-serif'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={teamLogo} alt="Team Logo" style={{ height: '50px', objectFit: 'contain' }} />
          <span style={{
            marginLeft: '12px',
            fontSize: '1.6rem',
            fontWeight: '600',
            fontFamily: 'Segoe UI, Tahoma, sans-serif',
            color: '#f2c94c'
          }}>
            California Wildfires Dashboard
          </span>
        </div>
        <nav>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setPage(item.value)}
              style={{
                marginLeft: '25px',
                background: item.value === activePage ? '#2d2d2d' : 'none',
                border: item.value === activePage ? '2px solid #f2c94c' : 'none',
                borderRadius: '6px',
                color: '#e0e0e0',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '1.1rem',
                fontFamily: 'Segoe UI, Tahoma, sans-serif',
                padding: '6px 12px'
              }}
              onMouseOver={e => e.target.style.color = '#f2994a'}
              onMouseOut={e => e.target.style.color = '#e0e0e0'}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Header;
