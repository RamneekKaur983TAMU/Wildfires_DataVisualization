import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const IntensityDonut = () => {
  const [data, setData] = useState([]);

  const COLORS = ['#ffcc80', '#ff9800', '#f44336', '#d32f2f'];

  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/intensity')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to load intensity data:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px', color: '#ffcc80' }}>
      <h4>Predicted Intensity</h4>
      <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
        {data.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="level"
                innerRadius={50}
                outerRadius={80}
                fill="#ff5722"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default IntensityDonut;
