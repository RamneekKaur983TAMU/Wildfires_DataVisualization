import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const DamageVsFireIncidents = ({ data = [] }) => {
  const maxCount = useMemo(() => {
    return Math.max(...data.map(item => item.count), 1);
  }, [data]);

  const getColor = (count, max) => {
    const intensity = 1 - count / max;
    const r = 255;
    const g = Math.floor(87 + intensity * 100);
    const b = 34;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const dataWithColor = useMemo(() => {
    return data.map(item => ({
      ...item,
      fill: getColor(item.count, maxCount)
    }));
  }, [data, maxCount]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const count = payload[0].value;
      return (
        <div style={{
          backgroundColor: '#222',
          color: '#fff',
          padding: '0.5rem',
          borderRadius: '4px'
        }}>
          <p><strong>{label}</strong></p>
          <p>Damage: {count}</p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div style={{
        flex: '1 1 400px',
        minHeight: '300px',
        backgroundColor: '#111',
        borderRadius: '8px',
        padding: '1rem',
        color: '#ffcc80'
      }}>
        <h4>Damage Distribution</h4>
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
      <h4>Damage Distribution</h4>
      <div style={{ height: '250px', backgroundColor: 'transparent', padding: '0.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataWithColor} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
            <XAxis
              dataKey="damage"
              tick={{ fill: '#ccc' }}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis tick={{ fill: '#ccc' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count">
              {dataWithColor.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DamageVsFireIncidents;
