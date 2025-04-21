import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts';

const ForecastTrends = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];

  const processedData = safeData.map((entry) => {
    const isFuture = entry.year > 2024;
    return {
      year: entry.year,
      historical: entry.historical ?? null,
      predicted: isFuture ? entry.predicted : null,
      confidence: isFuture ? entry.confidence : null,
    };
  });

  return (
    <div style={{ backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '1rem', color: '#ffcc80', marginTop: '1rem' }}>
      <h3 style={{ marginBottom: '0.5rem', textAlign: 'center', color: '#ffcc80' }}>
        Wildfire Incident Forecast (2021–2026) using WMA
      </h3>
      <div style={{ height: '240px', backgroundColor: 'transparent' }}>
        {data.length === 0 ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={processedData}>
              <XAxis dataKey="year" tick={{ fill: '#ccc' }} />
              <YAxis tick={{ fill: '#ccc' }} />
              <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
              <Bar dataKey="historical" fill="#ff5722" name="Historical" radius={[6, 6, 0, 0]} />
              <Line dataKey="predicted" stroke="#ff7043" strokeWidth={2} name="Predicted" dot={{ r: 5, fill: '#ffcc80' }}>
                <LabelList
                  dataKey="confidence"
                  position="top"
                  formatter={(value) => (value != null ? `${value}%` : '')}
                  fill="#ffcc80"
                  fontSize={12}
                  offset={10}
                />
              </Line>
              <Area
                type="monotone"
                dataKey="confidence"
                fill="#ffcc80"
                stroke="none"
                fillOpacity={0.2}
                name="Confidence"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
      <p style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '0.25rem', textAlign: 'center' }}>
        This chart shows historical and predicted wildfire incidents. The shaded band reflects prediction confidence for future estimates.
      </p>
    </div>
  );
};

export default ForecastTrends;
