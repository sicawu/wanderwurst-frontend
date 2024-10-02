import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CafeLeafletMaps = ({ cafe }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('map', {
      whenCreated: () => {
        console.log('Map created');
      },
    }).setView([51.505, -0.09], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      subdomains: ['a', 'b', 'c'],
    }).addTo(mapInstance);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map && cafe.location) {
      const { lat, lng } = cafe.location;
      map.setView([lat, lng], 17); // Set the center of the map to Da Nang
      const marker = createMarker(cafe.location, cafe.title, cafe.location.address, cafe.location.city, cafe.linkGoogleMaps);
      if (marker) {
        marker.addTo(map);
      }
    }
  }, [cafe, map]);

  const createMarker = (location, title, address, city, googlemaps) => {
    if (!location.lat || !location.lng) {
      console.error("Invalid location coordinates:", location);
      return null;
    }
    const marker = L.marker([location.lat, location.lng]);

    // Create the popup content, including a link to the cafe's website
    const popupContent = `
    <b>${title}</b><br>
    ${address} <br>
    ${city}<br>
    <a href="${googlemaps}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
    `;

    marker.bindPopup(popupContent);
    return marker;
  };

  return (
    <div id="map" style={{ height: '300px', width: '80%', overflow: 'hidden' }}></div>
  );
};

export default CafeLeafletMaps;
