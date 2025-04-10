import React from 'react';
import Header from './Header';

const AboutUs = ({ setPage }) => {
  const teamMembers = [
    { name: 'Alisha Raj', imageUrl: '/images/alisha.jpeg' },
    { name: 'Asmita Shivling Desai', imageUrl: '/images/asmita.jpeg' },
    { name: 'Ramneek Kaur', imageUrl: '/images/ramneek.jpg' },
    { name: 'Saksham Mehta', imageUrl: '/images/saksham.jpeg' }
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
                backgroundImage: `url(${member.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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

        <h4 style={{ marginTop: '3rem', fontSize: '20px' }}>We Value Your Feedback</h4>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We would love to hear your thoughts on this project and how we can improve. Please take a moment to fill out our feedback survey.
        </p>
        
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSduARsKZC8DOXMLMi8ffVa16p6f89Ks97iOWLmyyT95iHnZXQ/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#ff5722',
              color: '#fff',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              marginTop: '1rem',
              display: 'inline-block'
            }}
          >
            Take the Survey
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
