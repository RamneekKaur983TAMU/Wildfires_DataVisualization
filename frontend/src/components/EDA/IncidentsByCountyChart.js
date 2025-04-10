import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const IncidentsByCountyChart = ({ data }) => {
  // Show a loading state if no data is available
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

  // Sort by incidentCount in descending order and take the top 10 counties.
  const top10Counties = [...data]
    .sort((a, b) => b.incidentCount - a.incidentCount)
    .slice(0, 10);

  // Calculate the total number of incidents (from the overall data) for tooltip percentages.
  const totalIncidents = data.reduce((acc, curr) => acc + curr.incidentCount, 0);

  // Set the maximum count value for the Y-axis scale.
  const maxIncidents = Math.ceil(Math.max(...top10Counties.map(item => item.incidentCount)));

  // Define a custom tooltip to show the county name, incident count, and % of total.
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top10Counties} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="county"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fill: '#ccc', fontSize: 12 }}
            />
            <YAxis tick={{ fill: '#ccc' }} domain={[0, maxIncidents]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="incidentCount" fill="#ff5722" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncidentsByCountyChart;
