import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SeverityGauge = () => {
  const [severityValue, setSeverityValue] = useState(3); // Default for testing
  const [color, setColor] = useState('#f44336'); // Red
  const maxValue = 4;

  const damageWeights = {
    'No Damage': 0,
    'Affected (1-9%)': 1,
    'Minor (10-25%)': 2,
    'Destroyed (>50%)': 4,
  };

  useEffect(() => {
    const fetchSeverityData = async () => {
      try {
        const res = await fetch('/api/prediction/severity');
        const json = await res.json();
        const val = json[0]?.value || 0;
        setSeverityValue(val);

        if (val <= 1) setColor('#ff5722');
        else if (val <= 2) setColor('#ffeb3b');
        else setColor('#f44336');
      } catch (err) {
        console.error('Error fetching severity:', err);
      }
    };

    fetchSeverityData();
  }, []);

  const valueAngle = (severityValue / maxValue) * 180;

  const data = [
    { name: 'Severity', value: valueAngle, fill: color, severityValue },
    { name: 'Empty', value: 180 - valueAngle, fill: 'transparent' }
  ];

  const backgroundData = [
    { name: 'Background', value: 180, fill: '#444' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0].name === 'Severity') {
      return (
        <div style={{
          backgroundColor: '#333',
          padding: '10px',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          <p style={{ margin: 0 }}>Severity: {payload[0].payload.severityValue}/{maxValue}</p>
        </div>
      );
    }
    return null;
  };

  const getDamageLabel = () => {
    return `Severity Score: ${severityValue}`;
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
      <h4 style={{ marginBottom: '0.75rem', marginTop: '1.75rem' }}>Severity Gauge</h4>

      <div style={{ color: '#ffeb3b', fontWeight: 'bold', marginBottom: '-8rem' }}>
        {getDamageLabel()} / {maxValue}
      </div>

      <div style={{ height: '250px', backgroundColor: 'transparent', padding: '0.5rem' , marginBottom: '-2.75rem'}}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={backgroundData}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              isAnimationActive={false}
            />
            <Pie
              data={data}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ textAlign: 'left', color: '#ccc', fontSize: '0.85rem', marginTop: '0.5rem' }}>
        <div style={{ color: '#ffeb3b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Severity Levels:
        </div>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
          {Object.entries(damageWeights).map(([label, val]) => (
            <li key={label} style={{ marginBottom: '0.25rem' }}>
              <strong>{label}:</strong> {val}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeverityGauge;
