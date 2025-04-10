import React, { useEffect, useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const StructureDamageChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch the data from your backend API
    fetch('http://localhost:8000/api/getStructureTypeDamageSummary')
      .then((res) => res.json())
      .then((data) => {
        // Prepare the data for rendering the chart
        console.log(data);
        setChartData(data); // Update state with the fetched data
      });
  }, []);

  return (
    <div style={{ width: '100%', height: '500px', backgroundColor: '#111', padding: '1rem' }}>
      <h4 style={{ color: '#ffcc80' }}>Structure Type vs Damage and Number of Incidents</h4>
      
      {/* Check if chartData is empty (no data loaded) */}
      {chartData.length === 0 ? (
        <p style={{ color: '#aaa' }}>Loading...</p> // Display loading message if no data
      ) : (
        // Radar Chart will only be rendered when data is available
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="structureType" />
            <PolarRadiusAxis />
            <Radar name="Average Damage" dataKey="averageDamage" stroke="#ff5722" fill="#ff5722" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StructureDamageChart;
