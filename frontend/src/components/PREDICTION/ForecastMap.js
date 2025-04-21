import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ForecastMap = ({ data }) => {
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
          {data.map((p, idx) => (
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
