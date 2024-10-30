import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GiBalloonDog, GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import axios from "axios";

function NavBar({ profile, setProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [showCitiesDropdown, setShowCitiesDropdown] = useState(false);
  const [showPurposesDropdown, setShowPurposesDropdown] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const menuRef = useRef(null);

  useEffect(() => {
    // Fetch cities and purposes
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

    // Set profile from localStorage
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, [API_URL, setProfile]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCitiesDropdown = () => {
    setShowCitiesDropdown(!showCitiesDropdown);
  };

  const togglePurposesDropdown = () => {
    setShowPurposesDropdown(!showPurposesDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCitiesDropdown(false);
        setShowPurposesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 bg-black bg-opacity-70 text-white shadow-md p-3 flex justify-between items-center z-50">
      <div className="flex items-center ml-2">
        <button onClick={toggleMenu}>
          {isOpen ? <IoClose size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      <Link className="flex items-center" to="/">
        <GiBalloonDog size={30} />
      </Link>

      <div className="flex items-center mr-2">
        {profile ? (
          <Link to="/my-space" className="flex items-center">
            <img
              className="w-10 h-10 rounded-full object-cover border-2"
              src={profile.picture}
              alt={profile.name}
            />
          </Link>
        ) : (
          <Link to="/login" className="text-sm">
            Become a Sweet Spotter
          </Link>
        )}
      </div>

      <div
  ref={menuRef}
  className={`${isOpen ? "block" : "hidden"} py-10 absolute top-14 left-0 w-full bg-white bg-opacity-95 text-black z-50`}
>
  <ul className="flex flex-col items-center">
    <li className="py-3">
      <Link to="/best-cafes" onClick={() => setIsOpen(false)} className="flex items-center">
        Discover all Cafes
      </Link>
    </li>
    {/* City Menu with Dropdown */}
    <li className="py-3">
      <div>
        <button className="font-bold focus:outline-none" onClick={toggleCitiesDropdown}>
          Cafes by City ▼
        </button>
        {showCitiesDropdown && (
          <ul className="ml-4 mt-2">
            {cities.map((city) => (
              <li key={city} className="py-2">
                <Link
                  to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setIsOpen(false)}
                >
                  Cafes in {city}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
    {/* Purpose Menu with Dropdown */}
    <li className="py-3">
      <div>
        <button className="font-bold focus:outline-none" onClick={togglePurposesDropdown}>
          Cafes by Purpose ▼
        </button>
        {showPurposesDropdown && (
          <ul className="ml-4 mt-2">
            {purposes.map((purpose) => (
              <li key={purpose} className="py-2">
                <Link
                  to={`/best-cafes/for/${purpose.replace(/([A-Z])/g, '-$1').toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                >
                  {purpose.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/([A-Z])/g, ' $1')}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
    <li className="py-3">
      <Link to="/random" onClick={() => setIsOpen(false)} className="flex items-center">
        <GiPerspectiveDiceSixFacesRandom size={30} className="mr-1" />
        Random Cafe
      </Link>
    </li>
    <li className="py-3">
      <Link to="/about" onClick={() => setIsOpen(false)}>
        (Hi)Story
      </Link>
    </li>
  </ul>
</div>

    </div>
  );
}

export default NavBar;
