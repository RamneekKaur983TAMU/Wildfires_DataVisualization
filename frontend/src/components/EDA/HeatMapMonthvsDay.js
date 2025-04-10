import React, { useEffect, useState } from 'react';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthMap = {
  January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr', May: 'May', June: 'Jun',
  July: 'Jul', August: 'Aug', September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
};

const HeatMapMonthvsDay = () => {
  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/api/heatmap-data')
      .then(res => res.json())
      .then(setHeatmapData)
      .catch(console.error);
  }, []);

  const getColor = (count, max) => {
    if (!count) return '#fefae0';
    const scale = count / max;
    const red = 255;
    const green = Math.round(230 - scale * 180);  // yellower to redder
    const blue = Math.round(160 - scale * 160);   // lighter to darker
    return `rgb(${red},${Math.max(green, 0)},${Math.max(blue, 0)})`;
  };

  const maxCount = Math.max(...Object.values(heatmapData).flatMap(row =>
    Object.values(row).map(Number)
  ), 1);

  return (
    <div style={{
      flex: '1 1 400px',
      minHeight: '300px',
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '1rem',
      color: '#ffcc80'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Wildfires By Month and Day</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${days.length + 1}, 1fr)` }}>
        {/* Top-left corner cell */}
        <div style={{ fontWeight: 'bold' }}></div>
        {/* Days Header Row */}
        {days.map(day => (
          <div key={`day-header-${day}`} style={{ fontWeight: 'bold', textAlign: 'center', padding: '0.25rem', color: '#ffcc80' }}>{day}</div>
        ))}

        {/* Month Rows */}
        {months.map(month => (
          <React.Fragment key={`row-${month}`}>
            {/* Month label on left */}
            <div style={{ fontWeight: 'bold', textAlign: 'right', padding: '0.25rem 0.5rem', color: '#ffcc80' }}>{month}</div>
            {/* Data cells */}
            {days.map(day => {
              const normalizedHeatmap = heatmapData?.[String(day)] || {};
              const monthFullName = Object.keys(monthMap).find(key => monthMap[key] === month);
              const count = Number(normalizedHeatmap?.[monthFullName]) || 0;
              const color = getColor(count, maxCount);
              return (
                <div
                  key={`${month}-${day}`}
                  title={`Month: ${month}\nDay: ${day}\nIncidents: ${count}`}
                  style={{
                    backgroundColor: color,
                    border: '1px solid #444',
                    height: '30px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: count > 100 ? '#fff' : '#222',
                    fontWeight: 'bold'
                  }}
                >
                  &nbsp;
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        <span style={{ color: '#fff' }}>Low</span>
        <div style={{ flex: 1, height: '10px', background: 'linear-gradient(to right, #fefae0, #ffcc80, #ff5722, #b71c1c)', margin: '0 0.5rem' }} />
        <span style={{ color: '#fff' }}>High</span>
      </div>
    </div>
  );
};

export default HeatMapMonthvsDay;
