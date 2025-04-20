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

  // Structure type mapping to categories
  const structureTypeMapping = {
    // Single Residence category
    'SINGLE FAMILY': 'Single Residence',
    'SINGLE FAMILY DWELLING': 'Single Residence',
    'SINGLE FAMILY RESIDENCE': 'Single Residence',
    'CABIN': 'Single Residence',
    'HOUSE': 'Single Residence',
    'MOBILE HOME': 'Single Residence',
    'MODULAR HOME': 'Single Residence',
    
    // Multiple Residence category
    'MULTI-FAMILY': 'Multiple Residence',
    'MULTI-FAMILY DWELLING': 'Multiple Residence',
    'APARTMENT': 'Multiple Residence',
    'DUPLEX': 'Multiple Residence',
    'TOWNHOUSE': 'Multiple Residence',
    'CONDOMINIUM': 'Multiple Residence',
    
    // Nonresidential Commercial category
    'COMMERCIAL': 'Nonresidential Commercial',
    'BUSINESS': 'Nonresidential Commercial',
    'HOTEL': 'Nonresidential Commercial',
    'MOTEL': 'Nonresidential Commercial',
    'OFFICE': 'Nonresidential Commercial',
    'RETAIL': 'Nonresidential Commercial',
    'RESTAURANT': 'Nonresidential Commercial',
    
    // Mixed Commercial/Residential category
    'MIXED USE': 'Mixed Commercial/Residential',
    'MIXED COMMERCIAL/RESIDENTIAL': 'Mixed Commercial/Residential',
    
    // Infrastructure category
    'UTILITY': 'Infrastructure',
    'POWER': 'Infrastructure',
    'WATER': 'Infrastructure',
    'SEWER': 'Infrastructure',
    'COMMUNICATIONS': 'Infrastructure',
    'GOVERNMENT': 'Infrastructure',
    'SCHOOL': 'Infrastructure',
    'HOSPITAL': 'Infrastructure',
    
    // Agriculture category
    'AGRICULTURAL': 'Agriculture',
    'FARM': 'Agriculture',
    'BARN': 'Agriculture',
    'RANCH': 'Agriculture',
    
    // Other Minor Structure category (default)
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
          
          // Group by category
          const groupedData = responseData.reduce((acc, item) => {
            // Skip overall entry
            if (item.category === "Overall") return acc;
            
            // Determine which category this structure type belongs to
            const categoryName = structureTypeMapping[item.category.toUpperCase()] || 'Other Minor Structure';
            
            // Initialize the category if it doesn't exist
            if (!acc[categoryName]) {
              acc[categoryName] = {
                totalRisk: 0,
                totalIncidents: 0,
                count: 0
              };
            }
            
            // Add this item's data to the category
            acc[categoryName].totalRisk += item.risk || 0;
            acc[categoryName].totalIncidents += item.predictedIncidents || 0;
            acc[categoryName].count += 1;
            
            return acc;
          }, {});
          
          // Convert groupedData into the format needed for the radar chart
          const transformedData = Object.entries(groupedData).map(([category, values]) => ({
            subject: category,
            risk: Math.round(values.totalRisk / values.count), // Average risk
            predictedIncidents: Math.min(100, Math.round(values.totalIncidents / values.count)) // Average incidents, capped at 100
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

  if (loading) {
    return <div className="w-full h-96 flex items-center justify-center">Loading risk data...</div>;
  }

  if (data.length === 0) {
    return <div className="w-full h-96 flex items-center justify-center">No risk data available</div>;
  }

  return (
    <div className="w-full h-96">
      <h2 className="text-xl font-bold mb-4 text-center">Wildfire Risk Radar by Structure Category</h2>
      
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
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