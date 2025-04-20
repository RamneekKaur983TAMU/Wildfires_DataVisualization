import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';

const StructureDamageChart = ({ data = [] }) => {
  return (
    <div style={{ width: '100%', height: '500px', backgroundColor: '#111', padding: '1rem' }}>
      <h4 style={{ color: '#ffcc80' }}>Structure Type vs Damage and Number of Incidents</h4>
      {data.length === 0 ? (
        <p style={{ color: '#aaa' }}>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="structureType" />
            <PolarRadiusAxis />
            <Radar name="Average Damage" dataKey="averageDamage" stroke="#ff5722" fill="#ff5722" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StructureDamageChart;
