import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ForecastMap = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    console.log('🔍 Fetching forecast_output.json...');
    fetch('/forecast_output.json')
      .then(res => {
        console.log('✅ Response received:', res);
        return res.json();
      })
      .then(data => {
        console.log('📦 Parsed JSON:', data);
        if (Array.isArray(data)) {
          setPoints(data);
          console.log(`✅ Loaded ${data.length} forecast points.`);
        } else {
          console.error('❌ JSON did not return an array:', data);
          setPoints([]);
        }
      })
      .catch(err => {
        console.error('🚨 Error loading forecast map points:', err);
        setPoints([]);
      });
  }, []);

  return (
    <div style={{
      flex: '1 1 400px',
      minHeight: '300px',
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '1rem',
      color: '#ffcc80'
    }}>
      <h4>Predicted Hotspots Map (Next Year Forecast)</h4>
      <div style={{ height: '550px' }}>
        <MapContainer
          center={[37.5, -119.5]}
          zoom={6.5}
          minZoom={6.5}
          maxBounds={[[32.5, -125], [42.5, -114]]}
          maxBoundsViscosity={1.0}
          style={{ height: '100%', width: '100%', backgroundColor: '#000' }}
          attributionControl={false}
        >
          <TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
          {points.map((p, idx) => (
            <CircleMarker
              key={idx}
              center={[p.lat, p.lng]}
              radius={8}
              pathOptions={{
                color: '#ff0000',
                fillColor: '#ff0000',
                fillOpacity: 0.85
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div>
                  <strong>County:</strong> {p.county}<br />
                  <strong>Predicted:</strong> {p.predicted_incidents} fires<br />
                  <strong>Risk Share:</strong> {p.percentage}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ForecastMap;
