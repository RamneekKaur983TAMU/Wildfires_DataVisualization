import React from 'react';

const Decision = ({ setPage }) => {
  const actions = [
    'Increase funding for wildfire prevention in high-risk areas',
    'Enhance public awareness and evacuation planning',
    'Use predictive modeling to schedule controlled burns',
    'Allocate emergency response resources in advance'
  ];

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h3>Decision Support Based on Wildfire Data</h3>
        <p>
          Based on the past trends and predicted values, decision-makers should prioritize funding and resource allocation
          for high-risk regions during the wildfire season. Early intervention programs and controlled burns may significantly
          reduce the risk and impact.
        </p>
        <ul>
          {actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Decision;
