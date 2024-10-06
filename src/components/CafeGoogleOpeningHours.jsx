import { useState } from 'react';
import axios from 'axios';

function CafeOpeningHours({ placeId }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [openingHours, setOpeningHours] = useState([]);
  const [error, setError] = useState(null);
  const [showHours, setShowHours] = useState(false); // Control when to show hours
  const [isLoading, setIsLoading] = useState(false); // Control loading state

  const fetchOpeningHours = async () => {
    if (!placeId) return; // Wait until placeId is available

    setIsLoading(true); // Set loading state to true when the API call starts

    try {
      const response = await axios.get(`${API_URL}/cafe-opening-hours/${placeId}`);
      if (response.status === 200) {
        const hours = response.data || [];
        setOpeningHours(hours);
        setShowHours(true); // Show the hours and hide the button/p on success
      }
    } catch (error) {
      console.error("Error fetching opening hours:", error);
      setError("Could not fetch opening hours.");
    } finally {
      setIsLoading(false); // Set loading state to false when the API call finishes
    }
  };

  return (
    <div>
      {/* Conditionally render the button and paragraph based on showHours and isLoading */}
      {!showHours && !isLoading && (
        <>
          <button onClick={fetchOpeningHours} className="underline">
            Check Current Opening Hours *
          </button>
          <p className="text-xs italic p-3">
            * Please use only if you are really interested, because I am Swabian and want to avoid unnecessary payments to Google haha.
          </p>
        </>
      )}

      {isLoading && <p>Loading opening hours...</p>}

      {error && <p>{error}</p>}

      {showHours && openingHours.length > 0 && (
        <>
          <ul>
            {openingHours.map((day, index) => (
              <li key={index}>{day}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default CafeOpeningHours;
