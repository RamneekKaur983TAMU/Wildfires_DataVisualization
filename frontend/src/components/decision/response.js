import React from 'react';
import img1 from './img/1.jpeg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.webp';
import img5 from './img/5.jpg';
import img6 from './img/6.jpg';

const images = [img1, img2, img3, img4, img5, img6];

const Response = ({ data = [] }) => {
  const imageFilenames = ['1.jpeg', '2.jpg', '3.jpg', '4.webp', '5.jpg', '6.jpg'];

  return (
    <div style={{ padding: '0.25rem', backgroundColor: '#1a1a1a', borderRadius: '6px', color: '#fff' }}>
      <h3 style={{ color: '#ffcc80', textAlign: 'center', marginBottom: '1.5rem' }}>Proactive Wildfire Defense</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.25rem',
        padding: '0.25rem'
      }}>
        {[1, 2, 3, 4, 5, 6].map((num, i) => {
          const titles = [
            "Campfire Safety",
            "Grants",
            "Fireworks Safety",
            "Landowner Assistance",
            "Equipment & Vehicle Use",
            "Target Shooting Safety"
          ];
          const descriptions = [
            "Get permits, follow local restrictions, and fully extinguish your campfire.",
            "Find grants that help reduce emissions and support public health.",
            "Know your local laws before using any fireworks.",
            "Apply for reforestation grants to prevent wildfires.",
            "Drive safely and maintain equipment to lower fire risk.",
            "Shoot safely in safe zones and be ready to douse fires."
          ];
          return (
            <div key={i} style={{
              backgroundColor: '#2a2a2a',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
            }}>
              <img src={images[i]} alt={titles[i]} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <div style={{ padding: '0.2rem' }}>
                <h4 style={{ color: '#ffcc80', margin: '0 0 0.2rem 0', fontSize: '0.85rem' }}>{titles[i]}</h4>
                <p style={{ fontSize: '0.65rem', color: '#ccc', margin: 0 }}>{descriptions[i]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Response;
