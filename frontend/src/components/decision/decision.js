import React from 'react';
import decisionImage from './decision1.jpg';
import FilterSidebar from './FilterSidebar';
import FireStations from './firestations';
import RiskHotspots from './riskhotspots';
import Evacuation from './evacuation';
import Response from './response';

const linkStyleRed = {
  backgroundColor: '#1976d2', // accessible blue
  color: '#fff',
};

const linkStyleDark = {
  backgroundColor: '#333',
  color: '#ffd700', // updated to more accessible golden yellow
  textAlign: 'center',
  borderRadius: '6px',
  textDecoration: 'none',
};

const Decision = () => {
  return (
    <>
      <div style={{
        textAlign: 'center',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.15rem',
        fontWeight: 'bold',
        color: '#f2c94c',
        fontFamily: 'inherit'
      }}>
        Decision Making Dashboard - For Emergency Responders 
      </div>
      <div style={{
        backgroundColor: '#000',
        color: 'white',
        minHeight: 'calc(100vh - 60px)',
        padding: '0rem',
        display: 'grid',
        gridTemplateColumns: '0.8fr 2.4fr 0.8fr',
        gridTemplateRows: 'auto auto auto',
        gap: '1rem',
        gridTemplateAreas: `
          "kpis charts detail"
          "kpis charts detail"
          "kpis charts detail"
          "kpis charts detail"
        `
      }}>
        <div style={{
          gridArea: 'kpis',
          marginBottom: '1rem',
          marginLeft: '1.5rem',
          fontSize: '80%',
          backgroundColor: '#111',
          padding: '0.5rem',
          borderRadius: '8px',
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <h3 style={{ color: '#ffd700', marginTop: '1rem' }}>Helpful Resources</h3>

          <div style={{ backgroundColor: '#222', padding: '0.5rem', borderRadius: '6px' }}>
            <strong style={{ color: '#ffffff' }}>Emergency Contacts</strong>
            <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              <strong>911</strong> – For immediate fire or evacuation emergencies.<br />
              <strong>Local Fire Station Hotline</strong> – Call for alerts near your neighborhood.
            </p>
          </div>

          <div style={{ backgroundColor: '#222', padding: '0.5rem', borderRadius: '6px' }}>
            <strong style={{ color: '#ffffff' }}>In General</strong>
            <ul style={{ color: '#e0e0e0', fontSize: '0.75rem', paddingLeft: '1.2rem', margin: '0.5rem 0 0 0' }}>
              <li>Monitor local news and radio stations for fire information.</li>
              <li>Marin radio: AM 740 (KCBS), AM 810, FM 88.5</li>
              <li>West Marin: KWMR FM 90.5 Point Reyes, FM 89.9 Bolinas</li>
              <li>TV: KPIX, KRON, KTVU</li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#222', padding: '0.5rem', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <strong style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Online Resources</strong>

            <div style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '6px' }}>
              <p style={{ color: '#ffd700', margin: 0 }}>CAL FIRE Official Site</p>
              <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Official site for fire updates and safety guidelines from CAL FIRE.</p>
              <div style={{ textAlign: 'center' }}>
                <a href="https://fire.ca.gov/" target="_blank" rel="noopener noreferrer" style={{ ...linkStyleRed, padding: '0.4rem', fontSize: '0.8rem' }}>Visit</a>
              </div>
            </div>

            <div style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '6px' }}>
              <p style={{ color: '#ffd700', margin: 0 }}>LAFD Station Locator</p>
              <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Locate nearby fire stations in Los Angeles through the official LAFD directory.</p>
              <div style={{ textAlign: 'center' }}>
                <a href="https://lafd.org/fire-stations/station-results" target="_blank" rel="noopener noreferrer" style={{ ...linkStyleRed, padding: '0.4rem', fontSize: '0.8rem' }}>Visit</a>
              </div>
            </div>

            <div style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '6px' }}>
              <p style={{ color: '#ffd700', margin: 0 }}>CAL FIRE 2025 Incidents</p>
              <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Live wildfire incident updates and statistics across California for 2025.</p>
              <div style={{ textAlign: 'center' }}>
                <a href="https://www.fire.ca.gov/incidents/2025" target="_blank" rel="noopener noreferrer" style={{ ...linkStyleRed, padding: '0.4rem', fontSize: '0.8rem' }}>Visit</a>
              </div>
            </div>

            <div style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '6px' }}>
              <p style={{ color: '#ffd700', margin: 0 }}>Evacuation Readiness</p>
              <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Comprehensive guide on how to prepare and respond during wildfire evacuation scenarios.</p>
              <div style={{ textAlign: 'center' }}>
                <a href="https://www.readyforwildfire.org/" target="_blank" rel="noopener noreferrer" style={{ ...linkStyleRed, padding: '0.4rem', fontSize: '0.8rem' }}>Visit</a>
              </div>
            </div>

            <div style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '6px' }}>
              <p style={{ color: '#ffd700', margin: 0 }}>Wildfire Evacuation Procedures</p>
              <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Step-by-step procedures for executing a safe wildfire evacuation.</p>
              <div style={{ textAlign: 'center' }}>
                <a href="https://readyforwildfire.org/prepare-for-wildfire/go-evacuation-guide/#evacuationprocedures" target="_blank" rel="noopener noreferrer" style={{ ...linkStyleRed, padding: '0.4rem', fontSize: '0.8rem' }}>Visit</a>
              </div>
            </div>

            <div style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '6px' }}>
              <p style={{ color: '#ffd700', margin: 0 }}>Create an Evacuation Plan</p>
              <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Tips and templates to design a personalized emergency evacuation strategy.</p>
              <div style={{ textAlign: 'center' }}>
                <a href="https://firesafemarin.org/prepare-yourself/evacuation-guide/create-an-evacuation-plan/" target="_blank" rel="noopener noreferrer" style={{ ...linkStyleRed, padding: '0.4rem', fontSize: '0.8rem' }}>Visit</a>
              </div>
            </div>

            <div style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '6px' }}>
              <p style={{ color: '#ffd700', margin: 0 }}>Wireless Emergency Alerts (WEA)</p>
              <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Understand how to receive alerts on your mobile devices during wildfires.</p>
              <div style={{ textAlign: 'center' }}>
                <a href="https://calalerts.org/wea.html" target="_blank" rel="noopener noreferrer" style={{ ...linkStyleRed, padding: '0.4rem', fontSize: '0.8rem' }}>Visit</a>
              </div>
            </div>

            <div style={{ backgroundColor: '#333', padding: '0.5rem', borderRadius: '6px' }}>
              <p style={{ color: '#ffd700', margin: 0 }}>California Fire Foundation</p>
              <p style={{ color: '#e0e0e0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Support and information for firefighters, victims, and their families.</p>
              <div style={{ textAlign: 'center' }}>
                <a href="https://www.cafirefoundation.org/" target="_blank" rel="noopener noreferrer" style={{ ...linkStyleRed, padding: '0.4rem', fontSize: '0.8rem' }}>Visit</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ gridArea: 'charts', backgroundColor: '#111', padding: '1rem', borderRadius: '8px', display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
          <FireStations data={[]} />
          <RiskHotspots data={[]} />
          <Evacuation data={[]} />
          <Response data={[]} />
        </div>

        <div style={{
          gridArea: 'detail',
          backgroundColor: '#111',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '80%'
        }}>
          <h4 style={{ color: '#ffd700' }}>Insights</h4>
          <img src={decisionImage} alt="Wildfire Dashboard Overview" style={{ width: '100%', borderRadius: '6px', marginBottom: '0.75rem' }} />
          <p style={{ fontSize: '0.8rem', color: '#e0e0e0', marginBottom: '0.5rem' }}>
            The Decision Support Dashboard empowers emergency responders and the public by integrating visual analytics, live data feeds, and intuitive planning tools. It provides a centralized interface for wildfire response strategies.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              'Central map showing top 10 fire stations across California.',
              'Fire risk hotspot visualization with county overlays.',
              'Evacuation protocol flow with clear action steps.',
              'Real-time CAL FIRE incident link integration.',
              'Local radio and emergency contacts listed for citizens.',
              'Online resources available via visual cards with direct links.',
              'Responsive chart grid displaying incident types and counts.',
              'Tooltip enhancements and iconography aid accessibility.',
              'Color palette optimized for colorblind visibility.',
              'Supports informed decision-making for firefighting crews and public safety planning.'
            ].map((text, i) => (
              <div key={i} style={{ backgroundColor: '#222', color: '#e0e0e0', padding: '0.5rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Decision;
