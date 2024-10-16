import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { Link } from "react-router-dom";
import { GiBalloonDog, GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import axios from "axios";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const [isPurposeMenuOpen, setIsPurposeMenuOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  
  const menuRef = useRef(null); // Create a ref for the menu

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cities`),
      axios.get(`${API_URL}/topPick`)
    ])
      .then(([cities, purposes]) => {
        setCities(cities.data);
        setPurposes(purposes.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [API_URL]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Close submenus when the main menu is toggled
    if (isOpen) {
      setIsCityMenuOpen(false);
      setIsPurposeMenuOpen(false);
    }
  };

  const toggleCityMenu = () => {
    setIsCityMenuOpen(!isCityMenuOpen);
    if (isPurposeMenuOpen) {
      setIsPurposeMenuOpen(false); // Close purpose menu if city menu is opened
    }
  };

  const togglePurposeMenu = () => {
    setIsPurposeMenuOpen(!isPurposeMenuOpen);
    if (isCityMenuOpen) {
      setIsCityMenuOpen(false); // Close city menu if purpose menu is opened
    }
  };

  // Close the menu when clicking outside
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

  return (
    <div className="sticky bg-black bg-opacity-70 text-white shadow-md py-3 flex flex-row w-screen items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center ml-7">
        <Link className="flex items-center px-2 py-0.5" to="/">
          <GiBalloonDog size={30} />
        </Link>
      </div>

      {/* Right: Links and Burger Menu */}
      <div className="flex items-center mr-7">
        {/* Desktop Links */}
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
        </div>

        {/* Burger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <IoClose size={30} /> : <FiMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef} // Set the ref on the menu
        className={`${isOpen ? "block" : "hidden"
          } py-10 absolute top-14 left-0 w-full bg-white bg-opacity-95 text-black z-50 md:hidden`}
      >
        <ul className="flex flex-col items-center">
          {/* Discover All Cafes */}
          <li className="py-3">
            <Link to="/best-cafes" onClick={toggleMenu} className="flex items-center">
              Discover all Cafes
            </Link>
          </li>

          {/* Cafes by City */}
          <li className="py-3">
            <div>
              <button
                onClick={toggleCityMenu}
                className="font-bold focus:outline-none"
              >
                Cafes by City {isCityMenuOpen ? "▲" : "▼"}
              </button>
              {/* Cities submenu */}
              {isCityMenuOpen && (
                <ul className="ml-4 mt-2">
                  {cities.map((city) => (
                    <li key={city} className="py-2">
                      <Link
                        to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, "-")}`} // Dynamic link
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

          {/* Cafes by Purpose */}
          <li className="py-3">
            <div>
              <button
                onClick={togglePurposeMenu}
                className="font-bold focus:outline-none"
              >
                Cafes by Purpose {isPurposeMenuOpen ? "▲" : "▼"}
              </button>
              {/* Purpose submenu */}
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

          {/* Random Cafe */}
          <li className="py-3">
            <Link to="/random" onClick={toggleMenu} className="flex items-center">
              <GiPerspectiveDiceSixFacesRandom size={30} className="mr-1" />
              Random Cafe
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
