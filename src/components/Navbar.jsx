import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

function NavBar({ profile, setProfile }) {
  const [cities, setCities] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCitiesDropdown, setShowCitiesDropdown] = useState(false);
  const [showPurposesDropdown, setShowPurposesDropdown] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cities`),
      axios.get(`${API_URL}/topPick`)
    ])
      .then(([citiesResponse, purposesResponse]) => {
        setCities(citiesResponse.data);
        setPurposes(purposesResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, [API_URL, setProfile]);

  return (
    <div className="sticky top-0 bg-black text-white p-4 shadow-lg z-50">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-4xl"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold flex-grow text-center md:text-left md:flex-none"
        >
          Sweet Spots
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg">
          <Link to="/best-cafes" className="hover:text-gray-400">Discover Cafes</Link>

          {/* Cities Dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-400">Cafes by City</button>
            <div className="absolute left-0 hidden group-hover:block bg-white text-black shadow-lg rounded-lg py-2">
              {cities.map((city) => (
                <Link
                  key={city}
                  to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block p-2 hover:bg-gray-200"
                >
                 {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Purposes Dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-400">Cafes by Purpose</button>
            <div className="absolute left-0 hidden group-hover:block bg-white text-black shadow-lg rounded-lg py-2">
              {purposes.map((purpose) => (
                <Link
                  key={purpose}
                  to={`/best-cafes/for/${purpose.replace(/([A-Z])/g, '-$1').toLowerCase()}`}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  {purpose.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/random" className="hover:text-gray-400">Random Cafe</Link>
          <Link to="/about" className="hover:text-gray-400">(Hi)Story</Link>
        </nav>

        {/* Profile Link / Login Button */}
        <div>
          {profile ? (
            <Link to="/my-space" className="flex items-center">
              <img
                className="w-10 h-10 rounded-full border-2"
                src={profile.picture}
                alt={profile.name}
              />
            </Link>
          ) : (
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <Link to="/best-cafes" className="text-lg" onClick={() => setShowMobileMenu(false)}>Discover Cafes</Link>

          {/* City Dropdown Mobile */}
          <div>
            <button
              onClick={() => setShowCitiesDropdown(!showCitiesDropdown)}
              className="text-lg font-bold flex justify-center gap-5 w-full"
            >
              Cafes by City
              <span>{showCitiesDropdown ? "-" : "+"}</span>
            </button>
            <ul className={`${showCitiesDropdown ? "block" : "hidden"} pl-4`}>
              {cities.map((city) => (
                <li key={city}>
                  <Link
                    to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Cafes in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Purposes Dropdown Mobile */}
          <div>
            <button
              onClick={() => setShowPurposesDropdown(!showPurposesDropdown)}
              className="text-lg font-bold flex justify-center gap-5 w-full"
            >
              Cafes by Purpose
              <span>{showPurposesDropdown ? "-" : "+"}</span>
            </button>
            <ul className={`${showPurposesDropdown ? "block" : "hidden"}`}>
              {purposes.map((purpose) => (
                <li key={purpose}>
                  <Link
                    to={`/best-cafes/for/${purpose.replace(/([A-Z])/g, '-$1').toLowerCase()}`}
                    className="block py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {purpose.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/random" className="text-lg" onClick={() => setShowMobileMenu(false)}>Random Cafe</Link>
          <Link to="/about" className="text-lg" onClick={() => setShowMobileMenu(false)}>(Hi)Story</Link>
        </div>
      )}
    </div>

  );
}

export default NavBar;
