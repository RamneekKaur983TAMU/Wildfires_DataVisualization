import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Review Evacuation Plan Checklist',
    description:
      'Go over your Evacuation Plan Checklist often. Make sure it includes where to meet, who to call, and how to leave safely. Keep it updated so you’re always ready to move fast.'
  },
  {
    step: 2,
    title: 'Monitor wildfire updates',
    description:
      'Monitor wildfires in your area. Stay informed about your community’s emergency response plan, evacuation orders, and evacuation centers.'
  },
  {
    step: 3,
    title: 'Put ‘Go Bag’ in the car',
    description:
      'Keep your Emergency Supply Kit in your car. Include water, snacks, a first aid kit, and essential papers. This ensures you’re ready to leave quickly.'
  },
  {
    step: 4,
    title: 'Wear the right clothes',
    description:
      'Protect yourself by wearing long pants, tops, and tough shoes. 100% cotton is best. This guards against heat and sparks during wildfire exposure.'
  },
  {
    step: 5,
    title: 'Get pets ready to evacuate',
    description:
      'Plan for pet safety. Prepare carriers, food, and water in advance so pets can evacuate safely with you.'
  }
];

const Evacuation = () => {
  return (
    <div style={{ padding: '0.5rem', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff' }}>
      <h3 style={{ color: '#ffcc80', marginBottom: '1.5rem', textAlign: 'center' }}>Evacuation Steps</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {steps.map((step, index) => {
          const colors = ['#d32f2f', '#f9a825', '#00796b', '#1976d2', '#7b1fa2'];
          return (
            <div key={step.step} style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#2c2c2c',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                backgroundColor: colors[index],
                color: '#fff',
                padding: '1rem 0.75rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '48px'
              }}>
                {step.step.toString().padStart(2, '0')}
              </div>
              <div style={{
                padding: '0.5rem',
                color: '#fff',
                flex: 1
              }}>
                <h4 style={{ margin: 0, color: '#ffcc80', fontSize: '0.95rem' }}>{step.title}</h4>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#ccc' }}>{step.description}</p>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Evacuation;
