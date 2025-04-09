import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';
const App = ({eventData}) => {
    const center = { lat: 42.3265, lng: -122.8756 };
    const [locationIno, setLocationInfo]=useState(null)
    const markers= eventData.map(ev=>{
        if(ev.categories[0].id==8)
        {
            return <LocationMarker
            lat={ev.geometries[0].coordinates[1]}
            lng={ev.geometries[0].coordinates[0]}
           onClick={()=>
           {
            setLocationInfo({id: ev.id , title: ev.title, date: ev.geometries[0].date})
           }
           } />
        }
        return null
    })
    return (
      <APIProvider apiKey={'AIzaSyCXvJqTThSwEZHrXq7szZkn9Aa_STM7RuE'}>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={center}
          defaultZoom={4}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {/* <LocationMarker lat={center.lat} lng={center.lng} /> */}
        {markers}
        </Map>
        {locationIno && <LocationInfoBox info={locationIno}/>}
      </APIProvider>
    );
  };
  


export default App