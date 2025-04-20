import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const stations = [
  { name: 'Station 1 - Lincoln Heights', lat: 34.07528, lon: -118.21833 },
  { name: 'Station 2 - Boyle Heights', lat: 34.0457, lon: -118.2166 },
  { name: 'Station 3 - Civic Center', lat: 34.059, lon: -118.2468 },
  { name: 'Station 4 - Little Tokyo', lat: 34.0533, lon: -118.2395 },
  { name: 'Station 5 - Westchester', lat: 33.9567, lon: -118.3986 },
  { name: 'Station 6 - Angeleno Heights', lat: 34.0779, lon: -118.2877 },
  { name: 'Station 7 - Panorama City', lat: 34.25, lon: -118.448 },
  { name: 'Station 8 - Porter Ranch', lat: 34.277, lon: -118.553 },
  { name: 'Station 9 - Central City', lat: 34.0407, lon: -118.2488 },
  { name: 'Station 10 - Convention Center', lat: 34.0389, lon: -118.2648 }
];

const FireStations = () => {
  const getStationIcon = () => {
    return L.divIcon({
      html: `<div style="color: #ffcc80; font-size: 24px; transform: translate(-50%, -50%)">🚨</div>`,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  return (
    <div style={{
      flex: '1 1 400px',
      minHeight: '300px',
      backgroundColor: '#111',
      borderRadius: '8px',
      padding: '0.5rem',
      color: '#ffcc80',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h4 style={{ textAlign: 'center', margin: '0.5rem 0 1rem' }}>Fire Stations in Los Angeles</h4>
      <div style={{ width: '100%', height: '520px' }}>
        <MapContainer
          center={[34.05, -118.25]}
          zoom={10}
          minZoom={6}
          maxBounds={[[28, -128], [44, -110]]}
          maxBoundsViscosity={1.0}
          style={{ height: '100%', width: '100%', backgroundColor: '#000', borderRadius: '6px' }}
          attributionControl={false}
        >
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          />
          {stations.map((station, i) => (
            <Marker
              key={i}
              position={[station.lat, station.lon]}
              icon={getStationIcon()}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span><strong>{station.name}</strong></span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default FireStations;
