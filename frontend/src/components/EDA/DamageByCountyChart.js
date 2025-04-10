import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DamageByCountyChart = ({ data }) => {
  const top15 = data
    .sort((a, b) => b.averageDamage - a.averageDamage)
    .slice(0, 15);
  const maxDamage = Math.ceil(Math.max(...top15.map(c => c.averageDamage)));

  return (
    <div style={{
      flex: '1 1 400px',
      minHeight: '300px',
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '1rem',
      color: '#ffcc80'
    }}>
      <h4>Damage % by County</h4>
      <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
        {top15.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top15} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="county" angle={-45} textAnchor="end" interval={0} tick={{ fill: '#ccc', fontSize: 12 }} />
              <YAxis tick={{ fill: '#ccc' }} domain={[0, maxDamage]} />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }} />
              <Bar dataKey="averageDamage" fill="#ff5722" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DamageByCountyChart;
