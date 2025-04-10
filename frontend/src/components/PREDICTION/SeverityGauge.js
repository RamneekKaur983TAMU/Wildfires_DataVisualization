import React, { useEffect, useState } from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const SeverityGauge = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/severity')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to load severity data:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px', color: '#ffcc80' }}>
      <h4>Predicted Severity Gauge</h4>
      <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
        {data.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="60%"
              outerRadius="100%"
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                minAngle={15}
                label={{ fill: '#fff', position: 'insideStart' }}
                background
                clockWise
                dataKey="value"
              />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }} />
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
                wrapperStyle={{ color: '#ccc' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SeverityGauge;
