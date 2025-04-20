import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Label
} from 'recharts';

const CountOverTime = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/prediction/count');
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error('Failed to load prediction count data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'rgba(34, 34, 34, 0.9)',
          border: '1px solid #444',
          borderRadius: '4px',
          padding: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
          color: '#ffcc80'
        }}>
          <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Year: {label}</p>
          <p style={{ color: '#ff5722', margin: 0 }}>
            Fire Count: <strong>{payload[0].value}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', color: '#ccc' }}>
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: entry.color,
              marginRight: '5px',
              borderRadius: '50%'
            }} />
            <span>Predicted Fire Incidents</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      flex: '1 1 400px',
      minHeight: '300px',
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '1rem',
      color: '#ffcc80',
      marginTop: '2rem' 
    }}>
      <h4>Predicted Fire Count Over Time</h4>
      <div style={{ height: '250px', backgroundColor: 'transparent', padding: '0.5rem' }}>
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#aaa',
            flexDirection: 'column'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #444',
              borderTop: '3px solid #ff5722',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '10px'
            }} />
            <p>Loading data...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : data.length === 0 ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#aaa'
          }}>
            <p>No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
            >
              <CartesianGrid stroke="#333" strokeDasharray="3 3" opacity={0.6} />
              <XAxis
                dataKey="year"
                tick={{ fill: '#ccc' }}
                stroke="#444"
                tickLine={{ stroke: '#444' }}
              >
                <Label
                  value="Year"
                  position="bottom"
                  offset={0}
                  style={{ fill: '#ccc', marginTop: '10px' }}
                />
              </XAxis>

              <YAxis
                tick={{ fill: '#ccc' }}
                stroke="#444"
                tickLine={{ stroke: '#444' }}
              >
                <Label
                  value="Number of Fires"
                  angle={-90}
                  position="left"
                  style={{ textAnchor: 'middle', fill: '#ccc' }}
                />
              </YAxis>

              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} verticalAlign="top" height={36} />

              <Area
                type="monotone"
                dataKey="count"
                name="Predicted Fire Incidents"
                stroke="#ff5722"
                strokeWidth={2}
                fill="url(#colorGradient)"
                activeDot={{ r: 6, fill: '#ff5722', stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />

              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff5722" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff5722" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CountOverTime;
