import React from 'react';

const Decision = ({ setPage }) => {
  /* ───────────── 1. DATA SOURCES (dummy) ───────────── */
  const highRiskAreas = [
    { region: 'Butte County, CA', riskScore: 95 },
    { region: 'Los Angeles County, CA', riskScore: 90 },
    { region: 'Mariposa County, CA', riskScore: 88 },
    { region: 'Sonoma County, CA', riskScore: 85 }
  ];

  const fireDeptContacts = [
    {
      dept: 'CAL FIRE (California Dept. of Forestry & Fire Protection)',
      phone: '800‑633‑5555',
      email: 'info@fire.ca.gov'
    },
    {
      dept: 'US Forest Service – Pacific Southwest Region',
      phone: '800‑832‑1355',
      email: 'pswfs@usda.gov'
    },
    {
      dept: 'National Interagency Fire Center',
      phone: '208‑387‑5050',
      email: 'nifc@nifc.gov'
    }
  ];

  const actions = [
    'Increase funding for wildfire prevention in high‑risk areas',
    'Enhance public awareness and evacuation planning',
    'Use predictive modeling to schedule controlled burns',
    'Pre‑position emergency response resources before peak season'
  ];

  /* ───────────── 2. RENDER ───────────── */
  return (
    <div style={{ padding: '2rem' }}>
      <h3>Decision Support Based on Wildfire Data</h3>

      {/* Recommended actions */}
      <section style={{ marginTop: '1.5rem' }}>
        <h4>Recommended Actions</h4>
        <ul>
          {actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>

      {/* High‑risk regions */}
      <section style={{ marginTop: '1.5rem' }}>
        <h4>High‑Risk Regions (dummy risk scores)</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Region</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Risk&nbsp;Score</th>
            </tr>
          </thead>
          <tbody>
            {highRiskAreas.map((area) => (
              <tr key={area.region}>
                <td style={{ padding: '.4rem 0' }}>{area.region}</td>
                <td style={{ padding: '.4rem 0' }}>{area.riskScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Fire‑department contacts */}
      <section style={{ marginTop: '1.5rem' }}>
        <h4>Key Fire‑Department Contacts (USA)</h4>
        <ul>
          {fireDeptContacts.map((c) => (
            <li key={c.dept}>
              <strong>{c.dept}</strong> — {c.phone} — {c.email}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Decision;
