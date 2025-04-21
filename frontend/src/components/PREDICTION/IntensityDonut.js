import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const IntensityDonut = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];


  const COLORS = ['#ffcc80', '#ff9800', '#f44336', '#d32f2f'];

  if (safeData.length === 0) {
    return (
      <div style={{
        flex: '1 1 400px',
        minHeight: '300px',
        backgroundColor: '#111',
        borderRadius: '8px',
        padding: '1rem',
        color: '#ffcc80'
      }}>
        <h4>Predicted Intensity</h4>
        <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
          <p style={{ color: '#aaa' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      flex: '1 1 400px',
      minHeight: '300px',
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '1rem',
      color: '#ffcc80'
    }}>
      <h4>Predicted Intensity</h4>
      <div style={{ height: '250px', backgroundColor: 'transparent', padding: '0.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={safeData}
              dataKey="value"
              nameKey="level"
              innerRadius={50}
              outerRadius={80}
              label
            >
              {safeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }}
            />
            <Legend
              wrapperStyle={{
                fontSize: '0.85rem',
                color: '#ccc',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IntensityDonut;
