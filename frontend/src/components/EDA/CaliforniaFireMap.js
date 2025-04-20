import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CaliforniaFireMap = ({ data = [] }) => {
  const getColor = (count) => {
    if (count >= 100) return '#ff0000';
    if (count >= 50) return '#ff5722';
    if (count >= 20) return '#ff9800';
    if (count >= 10) return '#ffc107';
    return '#ffeb3b';
  };

  const getFireIcon = (count) => {
    const size = Math.sqrt(count) * 0.5;
    const color = getColor(count);

    return L.divIcon({
      html: `<div style="
        font-size: ${size}px;
        color: ${color};
        transform: translate(-50%, -50%);
      ">🔥</div>`,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  return (
    <div style={{
      flex: '1 1 400px',
      minHeight: '300px',
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '1rem',
      color: '#ffcc80'
    }}>
      <h4>California Fire Map</h4>
      <div style={{ height: '550px' }}>
        <MapContainer
          center={[37.5, -119.5]}
          zoom={6.5}
          minZoom={6}
          maxBounds={[[28, -128], [44, -110]]}
          maxBoundsViscosity={1.0}
          style={{ height: '100%', width: '100%', backgroundColor: '#000' }}
          attributionControl={false}
        >
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          />
          {data.map((point, i) => (
            <Marker
              key={i}
              position={[point.lat, point.lon]}
              icon={getFireIcon(point.totalFires)}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span>
                  <strong>County:</strong> {point.county}<br />
                  <strong>Total Fires:</strong> {point.totalFires}
                </span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CaliforniaFireMap;
