import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GiBalloonDog, GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useAuth } from '../context/auth.context'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const [isPurposeMenuOpen, setIsPurposeMenuOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [profile, setProfile] = useState(null);
  const { isLoggedIn, user, logOutUser } = useAuth();
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
  }, [API_URL]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsCityMenuOpen(false);
      setIsPurposeMenuOpen(false);
    }
  };

  const toggleCityMenu = () => {
    setIsCityMenuOpen(!isCityMenuOpen);
    if (isPurposeMenuOpen) {
      setIsPurposeMenuOpen(false);
    }
  };

  const togglePurposeMenu = () => {
    setIsPurposeMenuOpen(!isPurposeMenuOpen);
    if (isCityMenuOpen) {
      setIsCityMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    setProfile(null); // Update state to reflect logout
  };

  return (
    <div className="sticky bg-black bg-opacity-70 text-white shadow-md py-3 flex flex-row w-screen items-center justify-between">
      <div className="flex items-center ml-7">
        <Link className="flex items-center px-2 py-0.5" to="/">
          <GiBalloonDog size={30} />
        </Link>
      </div>

      <div className="flex items-center mr-7">
        <div className="hidden md:flex items-center">
          <Link to="/best-cafes" className="ml-4">
            All Cafes
          </Link>
          <p className="ml-4">|</p>
          <Link to="/random" className="ml-4 font-bold">
            <GiPerspectiveDiceSixFacesRandom
              size={30}
              className="border shadow-md rounded-full"
            />
          </Link>
          <p className="ml-4">|</p>
          {profile ? (
            <>
              <Link to="/my-space" className="ml-4">
              {profile.given_name}'s Space
              </Link>
            </>
          ) : (
            <Link to="/login" className="ml-4">
              Become a Sweet Spotter
            </Link>
          )}
          
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <IoClose size={30} /> : <FiMenu size={30} />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`${isOpen ? "block" : "hidden"
          } py-10 absolute top-14 left-0 w-full bg-white bg-opacity-95 text-black z-50 md:hidden`}
      >
        <ul className="flex flex-col items-center">
          <li className="py-3">
            <Link to="/best-cafes" onClick={toggleMenu} className="flex items-center">
              Discover all Cafes
            </Link>
          </li>
          <li className="py-3">
            <div>
              <button
                onClick={toggleCityMenu}
                className="font-bold focus:outline-none"
              >
                Cafes by City {isCityMenuOpen ? "▲" : "▼"}
              </button>
              {isCityMenuOpen && (
                <ul className="ml-4 mt-2">
                  {cities.map((city) => (
                    <li key={city} className="py-2">
                      <Link
                        to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={toggleMenu}
                      >
                        Cafes in {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li className="py-3">
            <div>
              <button
                onClick={togglePurposeMenu}
                className="font-bold focus:outline-none"
              >
                Cafes by Purpose {isPurposeMenuOpen ? "▲" : "▼"}
              </button>
              {isPurposeMenuOpen && (
                <ul className="ml-4 mt-2">
                  {purposes.map((purpose) => (
                    <li key={purpose} className="py-2">
                      <Link
                        to={`/best-cafes/for/${purpose.replace(/([A-Z])/g, '-$1').toLowerCase()}`}
                        onClick={toggleMenu}
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
            <Link to="/random" onClick={toggleMenu} className="flex items-center">
              <GiPerspectiveDiceSixFacesRandom size={30} className="mr-1" />
              Random Cafe
            </Link>
          </li>
          {profile ? (
            <li className="py-3">
              <Link to="/my-space" onClick={toggleMenu} className="flex items-center">
              {profile.given_name}'s Space
              </Link>
            </li>
          ) : (
            <li className="py-3">
              <Link to="/login" onClick={toggleMenu} className="flex items-center">
              Become a Sweet Spotter
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
