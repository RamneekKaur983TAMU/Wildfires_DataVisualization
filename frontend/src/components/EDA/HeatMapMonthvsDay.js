import React, { useEffect, useState } from 'react';
import './HeatMapMonthvsDay.css';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthMap = {
  January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr', May: 'May', June: 'Jun',
  July: 'Jul', August: 'Aug', September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
};

const HeatMapMonthvsDay = () => {
  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/api/heatmap-data')
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
    <div className="heatmap-container">
      <h2 className="heatmap-title">Wildfires By Month and Day</h2>
      <div className="heatmap-grid">
        <div className="heatmap-header-row">
          <div className="heatmap-corner" />
          {days.map(day => (
            <div className="heatmap-header-cell" key={`day-${day}`}>{day}</div>
          ))}
        </div>
        {months.map(month => (
          <div className="heatmap-row" key={month}>
            <div className="heatmap-day-label">{month}</div>
            {days.map(day => {
              const normalizedHeatmap = heatmapData?.[String(day)] || {};
              const count = Number(normalizedHeatmap?.[month]) || 0;
              const color = getColor(count, maxCount);
              return (
                <div
                  className="heatmap-cell"
                  key={`${month}-${day}`}
                  title={`Date: ${month} ${day}\nIncidents: ${count}`}
                  style={{ backgroundColor: color, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {count > 0 && (
                    <span className="heatmap-cell-text" style={{ fontSize: '0.7rem', color: '#000', fontWeight: 'bold' }}>
                      {count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Low</span>
        <div className="heatmap-gradient" />
        <span>High</span>
      </div>
    </div>
  );
};

export default HeatMapMonthvsDay;
