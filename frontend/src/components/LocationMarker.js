import { Marker } from '@vis.gl/react-google-maps';
import { Icon } from '@iconify/react';
import fireAlertIcon from '@iconify/icons-mdi/fire-alert';

const customIcon = {
    url: '/icons/fireIcon.png', 
    scaledSize: { width: 20, height: 20 }
  };
const LocationMarker = ({ lat, lng, onClick }) => {
  return (
    <Marker position={{ lat, lng }} onClick={onClick} icon={customIcon}>
      <div className="location-marker">
        <Icon icon={fireAlertIcon} className="location-icon" />
      </div>
    </Marker>
  );
};

export default LocationMarker;
