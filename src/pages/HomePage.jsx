import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import TopPickSection from "../components/SectionTopPick";
import FoodSection from "../components/SectionFood";
import DrinksSection from "../components/SectionDrinks";
import SpecsSection from "../components/SectionSpecs";
import TheStoryBehind from "../components/TheStoryBehind";
import CafeCarousel from "../components/CafeCarousel";


function Homepage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [cities, setCities] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [food, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [topPick, setTopPick] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cities`),
      axios.get(`${API_URL}/specs`),
      axios.get(`${API_URL}/food`),
      axios.get(`${API_URL}/drinks`),
      axios.get(`${API_URL}/topPick`)
    ])
      .then(([citiesRes, specsRes, foodRes, drinksRes, topPickRes]) => {
        setCities(citiesRes.data);
        setSpecs(specsRes.data);
        setFood(foodRes.data);
        setDrinks(drinksRes.data);
        setTopPick(topPickRes.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      });
  }, [API_URL]);

  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/djkv0io5j/image/upload/v1730692199/Sweet%20Spots/Revolver-Cafe-Canggu_hbvweu.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 70%'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10">
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-extrabold uppercase mb-8 animate-fade-in" style={{ textShadow: "0px 0px 20px rgba(0,0,0,0.7)" }}>
          Find your Sweet Spot
        </h1>

        {/* Choose a City Section */}
        <div className="w-full max-w-lg mb-16 bg-cover bg-center">
            <h2 className="text-xl sm:text-2xl text-white mb-6 font-semibold" style={{ textShadow: "0px 0px 15px rgba(0,0,0,0.6)" }}>            Choose a City
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city) => (
              <Link
                key={city}
                to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gradient-to-r from-gold to-yellow-500 text-white hover:from-black hover:to-gray-800 font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <TopPickSection topPick={topPick} />
      <div className="flex flex-col lg:flex-row items-stretch">
        <FoodSection className="flex-1" food={food} />
        <DrinksSection className="flex-1" drinks={drinks} />
      </div>
      <CafeCarousel
        urlSlugs={["tan-coffee-da-nang", "zest-ubud", "revolver-canggu", "namaskara-coffee-and-superfoods-ubud"]}
      />

      <SpecsSection specs={specs} />
      <TheStoryBehind />
    </>
  );
}

export default Homepage;
