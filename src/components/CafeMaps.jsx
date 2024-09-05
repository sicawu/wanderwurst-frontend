import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Define the container style for the map
const containerStyle = {
  width: '100%',
  height: '100vh'
};

// Define the center of the map
const center = {
  lat: 16.0519593,
  lng: 108.2492045
};

// Define the marker position
const markerPosition = {
  lat: 16.0519593,
  lng: 108.2492045
};

const CafeMaps = () => {
  return (
    <div className="py-10">
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

export default CafeMaps