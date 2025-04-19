import React from 'react';
import teamLogo from './images/teamlogo.jpeg';

const Header = ({ setPage }) => {
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
        padding: '10px 30px',
        height: '50px',
        backgroundColor: '#000',
        color: 'white'
      }}>
        <img src={teamLogo} alt="Team Logo" style={{ height: '50px', objectFit: 'contain' }} />
        <nav>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setPage(item.value)}
              style={{
                marginLeft: '25px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'color 0.3s',
                fontSize: '1.1rem',
              }}
              onMouseOver={e => e.target.style.color = '#ff4500'}
              onMouseOut={e => e.target.style.color = 'white'}
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
