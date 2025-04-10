import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const CountOverTime = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/count')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Failed to load prediction count data:', err));
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#111',
        padding: '1rem',
        borderRadius: '8px',
        color: '#ffcc80',
        flex: '1 1 300px',
        minHeight: '300px',
      }}
    >
      <h4>Predicted Fire Count Over Time</h4>
      <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
        {data.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#444" strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: '#ccc' }} />
              <YAxis tick={{ fill: '#ccc' }} />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }} />
              <Line type="monotone" dataKey="count" stroke="#ff5722" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CountOverTime;
