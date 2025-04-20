import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const SeverityGauge = () => {
 const [severityValue, setSeverityValue] = useState(3); // Setting default to 3 for testing
 const [color, setColor] = useState('#f44336'); // Red for value 3
 const [hovering, setHovering] = useState(false);


 const damageWeights = {
   'No Damage': 0,
   'Affected (1-9%)': 1,
   'Minor (10-25%)': 2,
   'Destroyed (>50%)': 4,
 };


 const maxValue = 4; // Maximum value from the damage weights


 useEffect(() => {
   const fetchSeverityData = async () => {
     try {
       const res = await fetch('/api/prediction/severity');
       const json = await res.json();
       const val = json[0]?.value || 0;
       setSeverityValue(val);


       if (val <= 1) setColor('#ff5722'); // Orange
       else if (val <= 2) setColor('#ffeb3b'); // Yellow
       else setColor('#f44336'); // Red
     } catch (err) {
       console.error('Error fetching severity:', err);
       // Continue with default values if fetch fails
     }
   };


   fetchSeverityData();
 }, []);


 // Calculate the angle for the value
 const valueAngle = (severityValue / maxValue) * 180;
  // Create the data for the chart
 const data = [
   { name: 'Severity', value: valueAngle, fill: color, severityValue },
   { name: 'Empty', value: 180 - valueAngle, fill: 'transparent' }
 ];
  // Background track data
 const backgroundData = [
   { name: 'Background', value: 180, fill: '#444' }
 ];


 // Custom tooltip
 const CustomTooltip = ({ active, payload }) => {
   if (active && payload && payload.length && payload[0].name === 'Severity') {
     return (
       <div style={{
         backgroundColor: '#333',
         padding: '10px',
         borderRadius: '4px',
         color: '#fff',
         fontSize: '16px',
         fontWeight: 'bold'
       }}>
         <p style={{ margin: 0 }}>Severity: {payload[0].payload.severityValue}/{maxValue}</p>
       </div>
     );
   }
   return null;
 };


 // Get damage label based on severity value
 const getDamageLabel = () => {
   return `Severity Score: ${severityValue}`
 };


 return (
   <div
     style={{
       backgroundColor: '#111',
       padding: '1.5rem',
       borderRadius: '12px',
       color: '#f6c863',
       textAlign: 'center',
       width: '100%',
       maxWidth: '400px',
       margin: '0 auto',
     }}
   >
     <h4 style={{ marginBottom: '0.25rem' }}>Severity Gauge</h4>


     <div style={{ color: '#ffeb3b', fontWeight: 'bold', marginBottom: '1rem' }}>
       {getDamageLabel()}
     </div>


     <div
       style={{
         height: '200px',
         backgroundColor: '#222',
         borderRadius: '8px',
         marginBottom: '1rem',
         position: 'relative'
       }}
     >
       <ResponsiveContainer width="100%" height="100%">
         <PieChart>
           {/* Background track */}
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
           {/* Value gauge */}
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


     <div style={{ textAlign: 'left', color: '#ccc', fontSize: '0.95rem' }}>
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

