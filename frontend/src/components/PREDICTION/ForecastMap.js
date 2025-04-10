import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ForecastMap = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/map')
      .then(res => res.json())
      .then(setPoints)
      .catch(err => console.error('Error loading forecast map points:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#111', padding: '1rem', borderRadius: '8px', color: '#ffcc80' }}>
      <h4>Predicted Hotspots Map</h4>
      <div style={{ height: '300px', backgroundColor: '#000' }}>
        <MapContainer
          center={[37.5, -119.5]}
          zoom={6.5}
          minZoom={6.5}
          maxBounds={[[32.5, -125], [42.5, -114]]}
          maxBoundsViscosity={1.0}
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {points.map((p, idx) => (
            <CircleMarker
              key={idx}
              center={[p.lat, p.lng]}
              radius={6}
              pathOptions={{ color: '#ff5722', fillOpacity: 0.8 }}
            >
              <Tooltip>{`Risk: ${p.risk}`}</Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ForecastMap;
