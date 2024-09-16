import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import FilterPopup from "./PopupFilterCafe"; // Import the popup component
import { Link } from "react-router-dom";
import { TbCoffeeOff } from "react-icons/tb";
import { BsStars } from "react-icons/bs";

function CafeList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [allCafes, setAllCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDrinks, setSelectedDrinks] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  // Fetch all cafes
  const getAllCafes = () => {
    axios
      .get(`${API_URL}/cafes`)
      .then((response) => {
        setAllCafes(response.data);
        setFilteredCafes(response.data);
      })
      .catch((error) => {
        console.log("Error getting Cafes from the API...");
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCafes();
  }, []);

  // Filter cafes based on search term, city, drinks, and food
  useEffect(() => {
    const filtered = allCafes.filter((cafe) => {
      const titleMatch = cafe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = cafe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const cityMatch = selectedCity ? cafe.location.city.toLowerCase() === selectedCity.toLowerCase() : true;
      const drinksMatch = selectedDrinks ? cafe.drinks.includes(selectedDrinks) : true;
      const foodMatch = selectedFood ? cafe.food.includes(selectedFood) : true;

      return (titleMatch || descriptionMatch) && cityMatch && drinksMatch && foodMatch;
    });
    setFilteredCafes(filtered);
  }, [searchTerm, selectedCity, selectedDrinks, selectedFood, allCafes]);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle city filter
  const handleCityFilter = (city) => {
    setSelectedCity(city);
  };

  // Handle drinks filter
  const handleDrinksFilter = (drinks) => {
    setSelectedDrinks(drinks);
  };

  // Handle food filter
  const handleFoodFilter = (food) => {
    setSelectedFood(food);
  };

  return (
    <>
      <h1 className="bg-black text-white uppercase text-center text-3xl py-0.5 font-extrabold italic">
        Best Cafes in the world
      </h1>
      <div className="flex justify-center items-center mt-8">
        {/* Search Bar & Filter Toggle Button */}
        <div className="flex flex-row items-center space-x-2">
          <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
            className="bg-blue-500 py-2 px-4 rounded-full"
            onClick={() => setShowPopup(true)}
          >
            <BsStars  className="text-4xl text-gray-900 shadow-md rounded-full" />
          </button>
        </div>

        {/* Popup for Filters */}
        {showPopup && (
          <FilterPopup
            onCityFilter={handleCityFilter}
            onDrinkFilter={handleDrinksFilter}
            onFoodFilter={handleFoodFilter}
            setShowPopup={setShowPopup} // Pass the setShowPopup function
          />
        )}
      </div>

      <div className="pt-0 px-7 flex flex-wrap justify-center mt-10">
        {filteredCafes.length > 0 ? (
          filteredCafes.map((cafe) => (
            <div
              key={cafe._id}
              className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5"
            >
              <Link to={`/cafes/${cafe.urlSlug}`}>
                <div className="h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl">
                  <img
                    src={cafe.image}
                    alt={cafe.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                  {cafe.location.city}
                </p>
                <p className="font-bold uppercase bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                  {cafe.location.country}
                </p>
                <p className="font-bold">{cafe.title}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="flex flex-col text-center items-center text-xl my-10 mb-20 gap-3">
            <TbCoffeeOff className="text-4xl" />
            <br /> Well... It looks like I haven't found your ideal cafe that matches your criteria - YET! Please try another search + filter.
          </p>
        )}
      </div>
    </>
  );
}

export default CafeList;
