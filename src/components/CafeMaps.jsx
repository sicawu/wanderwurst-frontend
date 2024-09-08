import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const CafeMaps = ({ lat, lng }) => {
  return (
    <div className="py-20">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={14}
        >
          <Marker
            position={{ lat, lng }}
            title="Cafe Location"
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CafeMaps