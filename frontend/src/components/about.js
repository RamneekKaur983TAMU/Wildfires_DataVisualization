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
    <div style={{
      backgroundColor: '#000',
      color: 'white',
      minHeight: '100vh',
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{ padding: '1rem 3rem 3rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', margin: '0 0 1rem 0', color: '#f2c94c' }}>
          About Us
        </h2>
        <h3 style={{ fontSize: '28px', marginBottom: '1.5rem', marginTop: '1rem', color: '#f2c94c' }}>Team Name: BlazeDefenders</h3>

        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          We are a team of data enthusiasts dedicated to creating meaningful, insightful, and actionable
          tools for understanding and responding to wildfires. Our visual analytics system brings together
          analysis, prediction, and decision support in one platform.
        </p>

        <h4 style={{ fontSize: '24px', marginBottom: '1.5rem', color: '#f2c94c' }}>Our Team</h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          justifyItems: 'center'
        }}>
          {teamMembers.map((member, idx) => (
            <div key={idx} style={{
              width: '220px',
              height: '240px',
              backgroundColor: '#111',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} 
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                marginBottom: '0.8rem',
                backgroundImage: `url(${member.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.3s ease'
              }} 
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <p style={{ margin: 0, fontWeight: 'bold', color: '#ffcc80' }}>{member.name}</p>
            </div>
          ))}
        </div>

        <div style={{
          fontSize: '18px',
          lineHeight: '1.6',
          marginTop: '3rem',
          marginBottom: '2.5rem',
          backgroundColor: '#111',
          padding: '1.5rem',
          borderLeft: '4px solid #ffcc80',
          fontStyle: 'italic',
          color: '#ccc',
          borderRadius: '8px'
        }}>
          “This project was born out of our passion to contribute toward disaster resilience using data.
          With wildfires increasingly affecting communities, we wanted to build something that can help
          responders and planners anticipate, understand, and respond better—faster.”
        </div>

        <h4 style={{ marginTop: '3rem', fontSize: '24px', color: '#f2c94c' }}>We Value Your Feedback</h4>
        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '2.5rem' }}>
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
              padding: '15px 25px',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              marginTop: '1.5rem',
              display: 'inline-block',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e64a19'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff5722'}
          >
            Take the Survey
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
