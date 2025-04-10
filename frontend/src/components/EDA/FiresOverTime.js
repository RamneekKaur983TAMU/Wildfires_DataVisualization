import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid , LineChart, Line } from 'recharts';
const FiresOverTime = ({ data }) => {
  console.log("Received data: ", data); // Log data to check the format
  return (
    <div style={{
      flex: '1 1 400px',
      minHeight: '300px',
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '1rem',
      color: '#ffcc80'
    }}>
      <h4>Fires Over Time</h4>
      <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
        {data.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="year"
                angle={-85}
                textAnchor="end"
                interval={0}
                tick={{ fill: '#ccc', fontSize: 12 }}
                label={{
                  value: 'Year',
                  position: 'insideBottom',
                  offset: -10,
                  fill: '#fff',
                  fontSize: 14,
                
                }}
              />
              <YAxis
                tick={{ fill: '#ccc' }}
                label={{
                  value: 'Number of Fires',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                  fill: '#fff',
                  fontSize: 14,
                  marginLeft: 10
                }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }} />
              <Line
                type="monotone"
                dataKey="fires"
                stroke="#ff5722"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8, fill: '#ff5722' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default FiresOverTime;

