import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const ForecastTrends = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/trends')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Failed to load forecast trend data:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#111', borderRadius: '8px', padding: '1rem', color: '#ffcc80' }}>
      <h4>Historical vs Predicted Trends</h4>
      <div style={{ height: '300px', backgroundColor: 'transparent' }}>
        {data.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid stroke="#333" strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: '#ccc' }} />
              <YAxis tick={{ fill: '#ccc' }} />
              <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
              <Bar dataKey="historical" fill="#8884d8" name="Historical" />
              <Line dataKey="predicted" stroke="#ff5722" strokeWidth={2} name="Predicted" />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ForecastTrends;
