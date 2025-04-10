import React from 'react';
import Header from './Header';

const AboutUs = ({ setPage }) => {
  const teamMembers = [
    { name: 'Alisha Raj' },
    { name: 'Asmita Shivling Desai' },
    { name: 'Ramneek Kaur' },
    { name: 'Saksham Mehta' }
  ];

  return (
    <div style={{ backgroundColor: '#000', color: 'white', height: '100vh', overflowY: 'auto' }}>
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '1rem', color: '#ff5722' }}>
          Wildfires - Analysis, Prediction and Decision Making
        </h2>
        <h3 style={{ fontSize: '24px', marginBottom: '1rem' }}>Team Name: BlazeDefenders</h3>

        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '2rem' }}>
          We are a team of data enthusiasts dedicated to creating meaningful, insightful, and actionable
          tools for understanding and responding to wildfires. Our visual analytics system brings together
          analysis, prediction, and decision support in one platform.
        </p>

        <h4 style={{ fontSize: '20px', marginBottom: '1rem' }}>Our Team</h4>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {teamMembers.map((member, idx) => (
            <div key={idx} style={{
              width: '180px',
              backgroundColor: '#111',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#333',
                margin: '0 auto 10px'
              }} />
              <p style={{ margin: 0, fontWeight: 'bold', color: '#ffcc80' }}>{member.name}</p>
            </div>
          ))}
        </div>

        <h4 style={{ marginTop: '3rem', fontSize: '20px' }}>Introduction</h4>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Wildfires have become a pressing global issue, exacerbated by climate change, urban expansion,
          and environmental degradation. This project aims to develop a visual analytics system that
          facilitates a deeper understanding of wildfire occurrences, prediction models, and damage assessments.
          Through interactive and data-driven visualizations, this system will support policymakers,
          emergency responders, and researchers in decision-making processes.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
