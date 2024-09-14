import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Homepage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [cities, setCities] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [topPick, setTopPick] = useState([]);

  useEffect(() => {
    // Fetch the list of cities from the API
    axios.get(`${API_URL}/cities`)
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });

    // Fetch the list of specs from the API
    axios.get(`${API_URL}/specs`)
      .then((response) => {
        setSpecs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specs:", error);
      });

    // Fetch the list of topPick from the API
    axios.get(`${API_URL}/topPick`)
      .then((response) => {
        setTopPick(response.data);
      })
      .catch((error) => {
        console.error("Error fetching topPick:", error);
      });
  }, [API_URL]);

  const iconMap = {
    working: "../icons/Working.png",
    bestCoffee: "../icons/Best-Coffee.png",
    socializing: "../icons/Socializing.png",
    girliesBrunch: "../icons/Girlies-Brunch.png",
    localPlace: "../icons/Local-Place.png",
    sustainable: "../icons/Sustainable.png"
  }

  return (
    <>
      <div className="homepage-container min-h-screen flex flex-col items-center">
        <h1 className="text-5xl text-white p-10 flex justify-center uppercase text-center font-extrabold">
          Find your sweet spot
        </h1>

        {/* Choose a City Section */}
        <div className="w-full max-w-lg mb-16 bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }}>
          <h2 className="text-l text-white mb-4 italic">Choose a city</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city) => (
              <Link
                key={city}
                to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-mint text-white border-1 border-black hover:bg-gray-200 text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-md text-center"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Specs Section */}
      <div className="min-h-screen w-full bg-green flex flex-col justify-center items-center py-16 px-4">
        <h2 className="pb-10 text-4xl text-white mb-4 font-extrabold uppercase text-center">Set priorities.</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {specs.map((spec) => (
            <Link
              key={spec}
              to={`/best-cafes/${spec.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-mint text-white border-1 border-black hover:bg-gray-200 font-semibold py-1 px-3 rounded-lg shadow-md text-center"
            >
              {spec}
            </Link>
          ))}
        </div>
      </div>

      {/* ICONS FOR TOP PICKS */}
      <div className="flex flex-row justify-center mb-10 gap-5">
        {topPick.map((topPick, index) => {
          const iconUrl = iconMap[topPick]
          const linkText = topPick.replace(/([A-Z])/g, '-$1').toLowerCase() // convert camelCase to kebab-case
          return (
            <Link
            to={`/best-cafes/for/${linkText}`}
              className="w-12 h-12"
              >
              <img key={index}
                src={iconUrl}
                alt={topPick}
                className="w-full h-full border-2 rounded-full object-cover object-center" />
            </Link>
          )
        })}
      </div >
    </>
  );
}

export default Homepage