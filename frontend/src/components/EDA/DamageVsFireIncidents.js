import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const DamageDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/damage-distribution')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching damage distribution:', err));
  }, []);

  return (
    <div
      style={{
        flex: '1 1 400px',
        minHeight: '300px',
        backgroundColor: '#111',
        borderRadius: '8px',
        padding: '1rem',
        color: '#ffcc80',
      }}
    >
      <h4>Damage Distribution</h4>
      <div style={{ height: '250px', backgroundColor: 'transparent', padding: 0 }}>
        {data.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
              <XAxis dataKey="damage" tick={{ fill: '#ccc' }} interval={0} angle={-25} textAnchor="end" />
              <YAxis tick={{ fill: '#ccc' }} />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }} />
              <Bar dataKey="count" fill="#f94144" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DamageDistributionChart;