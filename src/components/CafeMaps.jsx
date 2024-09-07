import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// Define the container style for the map
const containerStyle = {
  width: '100%',
  height: '100vh'
};

const CafeMaps = ({ lat = 16.0519593, lng = 108.2492045 }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && window.google) {
      const map = mapRef.current.state.map; // Get the Google Map instance

      const { AdvancedMarkerElement } = window.google.maps.marker;

      const position = { lat, lng };

      // Create the AdvancedMarkerElement instance
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: 'Cafe Location',
      });
    }
  }, [lat, lng]);

  return (
    <div className="py-20">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={14}
          ref={mapRef}
        />
      </LoadScript>
    </div>
  );
};

export default CafeMaps