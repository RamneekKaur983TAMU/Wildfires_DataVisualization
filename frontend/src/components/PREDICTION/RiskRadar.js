import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RiskRadar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/risk')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to load risk radar data:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px', color: '#ffcc80' }}>
      <h4>Predicted Risk Radar</h4>
      <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
        {data.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#ccc' }} />
              <PolarRadiusAxis tick={{ fill: '#ccc' }} />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }} />
              <Radar name="Risk" dataKey="risk" stroke="#ff5722" fill="#ff5722" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RiskRadar;
