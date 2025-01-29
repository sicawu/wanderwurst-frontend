import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CafeLeafletMaps = ({ cafes }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('map').setView([51.505, -0.09], 13); // Default location
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mapInstance);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map && cafes.length > 0) {
      const bounds = L.latLngBounds(); // Create bounds to fit all markers

      cafes.forEach((cafe) => {
        const { lat, lng } = cafe.location;
        if (lat && lng) {
          const marker = createMarker(cafe);
          if (marker) {
            marker.addTo(map);
            bounds.extend([lat, lng]); // Extend bounds for each marker
          }
        }
      });

      map.fitBounds(bounds); // Adjust the map to fit all markers
    }
  }, [cafes, map]);

  const createMarker = (cafe) => {
    const { location, title, urlSlug } = cafe;
    if (!location.lat || !location.lng) {
      console.error('Invalid location coordinates:', location);
      return null;
    }

    const marker = L.marker([location.lat, location.lng]);

    // Create the popup content with a link to the cafe detail page
    const popupContent = `
      <b>${title}</b><br>
      ${location.address || ''}<br>
      ${location.city || ''}<br>
      <a href="/cafes/${urlSlug}" target="_blank" rel="noopener noreferrer">View Details</a>
    `;

    marker.bindPopup(popupContent);
    return marker;
  };

  return <div id="map" style={{ height: '400px', width: '100%', overflow: 'hidden' }}></div>;
};

export default CafeLeafletMaps;
