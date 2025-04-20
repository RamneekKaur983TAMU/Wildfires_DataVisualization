import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RiskRadar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const structureTypeMapping = {
    'SINGLE FAMILY': 'Single Residence',
    'SINGLE FAMILY DWELLING': 'Single Residence',
    'SINGLE FAMILY RESIDENCE': 'Single Residence',
    'CABIN': 'Single Residence',
    'HOUSE': 'Single Residence',
    'MOBILE HOME': 'Single Residence',
    'MODULAR HOME': 'Single Residence',
    'MULTI-FAMILY': 'Multiple Residence',
    'MULTI-FAMILY DWELLING': 'Multiple Residence',
    'APARTMENT': 'Multiple Residence',
    'DUPLEX': 'Multiple Residence',
    'TOWNHOUSE': 'Multiple Residence',
    'CONDOMINIUM': 'Multiple Residence',
    'COMMERCIAL': 'Nonresidential Commercial',
    'BUSINESS': 'Nonresidential Commercial',
    'HOTEL': 'Nonresidential Commercial',
    'MOTEL': 'Nonresidential Commercial',
    'OFFICE': 'Nonresidential Commercial',
    'RETAIL': 'Nonresidential Commercial',
    'RESTAURANT': 'Nonresidential Commercial',
    'MIXED USE': 'Mixed Commercial/Residential',
    'MIXED COMMERCIAL/RESIDENTIAL': 'Mixed Commercial/Residential',
    'UTILITY': 'Infrastructure',
    'POWER': 'Infrastructure',
    'WATER': 'Infrastructure',
    'SEWER': 'Infrastructure',
    'COMMUNICATIONS': 'Infrastructure',
    'GOVERNMENT': 'Infrastructure',
    'SCHOOL': 'Infrastructure',
    'HOSPITAL': 'Infrastructure',
    'AGRICULTURAL': 'Agriculture',
    'FARM': 'Agriculture',
    'BARN': 'Agriculture',
    'RANCH': 'Agriculture',
    'OUTBUILDING': 'Other Minor Structure',
    'SHED': 'Other Minor Structure',
    'GARAGE': 'Other Minor Structure',
    'WORKSHOP': 'Other Minor Structure',
    'STORAGE': 'Other Minor Structure'
  };

  useEffect(() => {
    const fetchRiskRadarData = async () => {
      try {
        const res = await fetch('/api/prediction/risk');
        if (res.ok) {
          const responseData = await res.json();
          const groupedData = responseData.reduce((acc, item) => {
            if (item.category === "Overall") return acc;
            const categoryName = structureTypeMapping[item.category.toUpperCase()] || 'Other Minor Structure';
            if (!acc[categoryName]) {
              acc[categoryName] = {
                totalRisk: 0,
                totalIncidents: 0,
                count: 0
              };
            }
            acc[categoryName].totalRisk += item.risk || 0;
            acc[categoryName].totalIncidents += item.predictedIncidents || 0;
            acc[categoryName].count += 1;
            return acc;
          }, {});
          const transformedData = Object.entries(groupedData).map(([category, values]) => ({
            subject: category,
            risk: Math.round(values.totalRisk / values.count),
            predictedIncidents: Math.min(100, Math.round(values.totalIncidents / values.count))
          }));
          setData(transformedData);
        }
      } catch (err) {
        console.error('Failed to load risk radar data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRiskRadarData();
  }, []);

  if (loading || data.length === 0) {
    return (
      <div style={{
        flex: '1 1 400px',
        minHeight: '300px',
        backgroundColor: '#111',
        borderRadius: '8px',
        padding: '1rem',
        color: '#ffcc80'
      }}>
        <h4>Wildfire Risk Radar</h4>
        <div style={{ height: '250px', backgroundColor: '#222', padding: '0.5rem' }}>
          <p style={{ color: '#aaa' }}>
            {loading ? 'Loading risk data...' : 'No risk data available'}
          </p>
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
      <h4>Wildfire Risk Radar</h4>
      <div style={{ height: '250px', backgroundColor: 'transparent', padding: '0.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar
              name="Risk Score"
              dataKey="risk"
              stroke="#ff5722"
              fill="#ff5722"
              fillOpacity={0.6}
            />
            <Radar
              name="Predicted Incidents"
              dataKey="predictedIncidents"
              stroke="#FAD02C"
              fill="#FAD02C"
              fillOpacity={0.3}
            />
            <Tooltip formatter={(value, name) => [value, name]} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskRadar;
