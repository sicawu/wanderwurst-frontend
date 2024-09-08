import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Homepage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch the list of cities from the API
    axios.get(`${API_URL}/cities`)
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, [API_URL]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-5xl p-10 flex justify-center uppercase text-center font-extrabold">
        Find your sweet spot
      </h1>

      {/* Choose a City Section */}
      <div className="w-full max-w-lg mb-16">
        <h2 className="text-xl text-gray-700 mb-4 italic">
          Choose a city
        </h2>
        <div className="grid grid-cols-2 gap-4 px-3">
          {cities.map((city) => (
            <Link
              key={city}
              to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, '-')}`} // Format city name for the URL
              className="bg-green text-white uppercase hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-md text-center"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage