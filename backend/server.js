import React, { useState, useEffect } from 'react';

const [kpiData, setKpiData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:4000/api/summary?${query}`);
      const data = await res.json();
      setKpiData(data);
    } catch (error) {
      console.error('Failed to fetch KPI data', error);
    }
  };
  fetchData();
}, [filters]);

const kpiKeys = {
  'Total Incidents': 'totalIncidents',
  'Avg Damage %': 'avgDamage',
  'Structures Destroyed': 'structuresDestroyed',
  'Most Affected Area': 'mostAffectedArea',
  'Most Active Year': 'mostActiveYear',
  'Total Value Loss': 'totalValueLoss'
};

// Replace the static KPI values with live data
<h2 style={{ ... }}>
  {kpiData ? kpiData[kpiKeys[title]] || '--' : '--'}
</h2>