import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const IncidentsByCountyChart = ({ data }) => {
  // Memoize to avoid recalculating on each render
  const top10Counties = useMemo(() => {
    return [...data]
      .sort((a, b) => b.incidentCount - a.incidentCount)
      .slice(0, 10);
  }, [data]);

  // Calculate total incidents for percentage calculations (Memoize this too)
  const totalIncidents = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.incidentCount, 0);
  }, [data]);

  // Set maximum incident count for Y-axis (Memoized)
  const maxIncidents = useMemo(() => {
    return Math.ceil(Math.max(...top10Counties.map(item => item.incidentCount)));
  }, [top10Counties]);

  // Memoized color calculation based on incident count
  const getColor = (count, max) => {
    const intensity = count / max;
    const r = Math.floor(255); // stays the same
    const g = Math.floor(140 - intensity * 100); // decreases with intensity
    const b = Math.floor(0); // stays the same
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Memoize color assignment for performance
  const top10CountiesWithColor = useMemo(() => {
    return top10Counties.map(county => ({
      ...county,
      fill: getColor(county.incidentCount, maxIncidents)
    }));
  }, [top10Counties, maxIncidents]);

  // Custom Tooltip with percentage calculation
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const count = payload[0].value;
      const percentage = ((count / totalIncidents) * 100).toFixed(2);
      return (
        <div style={{
          backgroundColor: '#222',
          color: '#fff',
          padding: '0.5rem',
          borderRadius: '4px'
        }}>
          <p><strong>{label}</strong></p>
          <p>Incidents: {count}</p>
          <p>% of Total: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // Return a loading state if no data is available
  if (!data || data.length === 0) {
    return (
      <div style={{
        flex: '1 1 400px',
        minHeight: '300px',
        backgroundColor: '#111',
        borderRadius: '8px',
        padding: '1rem',
        color: '#ffcc80'
      }}>
        <h4>Incidents by County</h4>
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
      <h4>Incidents by County</h4>
      <div style={{ height: '250px', backgroundColor: 'transparent', padding: '0.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top10CountiesWithColor} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
            <XAxis
              dataKey="county"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fill: '#ccc', fontSize: 12 }}
            />
            <YAxis tick={{ fill: '#ccc' }} domain={[0, maxIncidents]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="incidentCount">
              {top10CountiesWithColor.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncidentsByCountyChart;
