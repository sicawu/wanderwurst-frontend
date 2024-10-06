import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import FilterPopup from "./PopupFilterCafe";
import { Link } from "react-router-dom";
import { TbCoffeeOff } from "react-icons/tb";
import { GoFilter } from "react-icons/go";

// Helmet library for individual SEO title + description
import { Helmet } from "react-helmet-async";

function CafeList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [allCafes, setAllCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // State to hold the selected filters' descriptions
  const [filters, setFilters] = useState({
    city: "",
    drink: "",
    food: "",
    spec: "",
  });

  // State to hold the unique filter values
  const [filterValues, setFilterValues] = useState({
    cities: [],
    drinks: [],
    foods: [],
    specs: [],
  });

  // Fetch all cafes
  const getAllCafes = () => {
    axios
      .get(`${API_URL}/cafes`)
      .then((response) => {
        setAllCafes(response.data);
        setFilteredCafes(response.data);
        // Extract unique filter options
        const cities = [...new Set(response.data.map((cafe) => cafe.location.city))];
        const drinks = [...new Set(response.data.flatMap((cafe) => cafe.drinks))];
        const foods = [...new Set(response.data.flatMap((cafe) => cafe.food))];
        const specs = [...new Set(response.data.flatMap((cafe) => cafe.specs))];
        setFilterValues({
          cities,
          drinks,
          foods,
          specs,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCafes();
  }, []);

  // Search through cafes based on search term, city, drinks, food, and specs
  useEffect(() => {
    const filtered = allCafes.filter((cafe) => {
      const titleMatch = cafe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = cafe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const foodMatch = cafe.food.some((food) => food.toLowerCase().includes(searchTerm.toLowerCase()));
      const drinksMatch = cafe.drinks.some((drink) => drink.toLowerCase().includes(searchTerm.toLowerCase()));
      const specsMatch = cafe.specs.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      const cityMatch = selectedCity ? cafe.location.city.toLowerCase() === selectedCity.toLowerCase() : true;
      const selectedDrinksMatch = selectedDrink ? cafe.drinks.includes(selectedDrink) : true;
      const selectedFoodMatch = selectedFood ? cafe.food.includes(selectedFood) : true;
      const selectedSpecsMatch = selectedSpec ? cafe.specs.some((spec) => spec.toLowerCase() === selectedSpec.toLowerCase()) : true;

      return (titleMatch || descriptionMatch || foodMatch || drinksMatch || specsMatch) && cityMatch && selectedDrinksMatch && selectedFoodMatch && selectedSpecsMatch;
    });
    setFilteredCafes(filtered);
  }, [searchTerm, selectedCity, selectedDrink, selectedFood, selectedSpec, allCafes]);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle city filter
  const handleCityFilter = (city) => {
    setSelectedCity(city);
    setFilters((prev) => ({ ...prev, city }));
  };

  // Handle drinks filter
  const handleDrinkFilter = (drink) => {
    setSelectedDrink(drink);
    setFilters((prev) => ({ ...prev, drink }));
  };

  // Handle food filter
  const handleFoodFilter = (food) => {
    setSelectedFood(food);
    setFilters((prev) => ({ ...prev, food }));
  };

  // Handle specs filter
  const handleSpecFilter = (spec) => {
    setSelectedSpec(spec);
    setFilters((prev) => ({ ...prev, spec: spec }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCity("");
    setSelectedDrink("");
    setSelectedFood("");
    setSelectedSpec("");
    setFilters({ city: "", drink: "", food: "", spec: "" });
  };

  return (
    <>
      <Helmet>
        <title>{`${filteredCafes.length} Top Cafes in the World | Sweet Spots`}</title>
        <meta
          name="description"
          content={`Discover my favorite cafes worldwide. Carefully curated, your little safe space in the world.`}
        />
      </Helmet>
      <h1 className="bg-black text-white uppercase text-center text-3xl py-0.5 font-extrabold italic">
        Best Cafes in the World
      </h1>
      <div className="flex justify-center items-center mt-8">

        {/* Search Bar & Filter Toggle Button */}
        <div className="flex flex-row items-center space-x-2">
          <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
            className="bg-blue-500 py-2 px-4 rounded-full"
            onClick={() => setShowPopup(true)}
          >
            <GoFilter size={40} className="rounded-full hover:bg-white hover:shadow-lg transition duration-300" />
          </button>
        </div>

        {/* Popup for Filters */}
        {showPopup && (
          <FilterPopup
            onCityFilter={handleCityFilter}
            onDrinkFilter={handleDrinkFilter}
            onFoodFilter={handleFoodFilter}
            onSpecFilter={handleSpecFilter}
            cities={filterValues.cities}
            drinks={filterValues.drinks}
            foods={filterValues.foods}
            specs={filterValues.specs}
            setShowPopup={setShowPopup}
          />
        )}
      </div>

      {/* Display selected filters */}
      <div className="mt-4 px-7">
        {Object.entries(filters).map(([key, value]) =>
          value ? (
            <span
              key={key}
              className="inline-block border border-grey py-0.5 px-2 mr-2 mb-2 text-sm shadow-md hover:bg-white hover:shadow-lg transition duration-300"
            >
              {value}
              <button
                onClick={() => {
                  // Clear individual filter
                  setFilters((prev) => ({ ...prev, [key]: "" }));
                  if (key === "city") setSelectedCity("");
                  if (key === "drink") setSelectedDrink("");
                  if (key === "food") setSelectedFood("");
                  if (key === "spec") setSelectedSpec("");
                }}
                className="ml-2"
              >
                x
              </button>
            </span>
          ) : null
        )}
        {(selectedCity || selectedDrink || selectedFood || selectedSpec) && (
          <button
            onClick={clearFilters}
            className="bg-grey border border-grey px-2 py-0.5 mt-1 text-sm shadow-md hover:bg-mint hover:shadow-lg transition duration-300"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="pt-0 px-7 flex flex-wrap justify-center mt-10 pb-10">
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
          <div className="text-center">
            <TbCoffeeOff size={60} />
            <p className="mt-2">No cafes found with the applied filters</p>
          </div>
        )}
      </div>
    </>
  );
}

export default CafeList;
