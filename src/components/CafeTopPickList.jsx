import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FilterPopup from "./PopupFilterCafe";
import { GoFilter } from "react-icons/go";
import { Helmet, HelmetProvider } from "react-helmet-async";

function CafeSpecList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [cafeTopPick, setcafeTopPick] = useState([]);
  const { toppick } = useParams();
  const topPickToFilter = toppick;

  const getCafes = () => {
    const topPick = topPickToFilter.replace(/-([a-z])/g, (match, group) => group.toUpperCase());
    axios.get(`${API_URL}/cafes/for/${topPick}`)
      .then((response) => {
        setcafeTopPick(response.data);
        setFilteredCafes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCafes();
  }, [topPickToFilter]);

  // Capitalize the first letter of each word and keep spaces - For Headline in Frontend
  const formatTopPicks = (toppick) => {
    return toppick.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // State to hold the selected filters' descriptions
  const [filters, setFilters] = useState({
    city: "",
    drink: "",
    food: "",
    spec: ""
  })

  // State to toggle the popup
  const [showPopup, setShowPopup] = useState(false)

  // Update the list based on the filter
  const handleFilter = () => {
    const filteredCafes = cafeTopPick.filter((cafe) => {
      const cityMatch = filters.city === "" || cafe.location.city === filters.city;
      const drinkMatch = filters.drink === "" || cafe.drinks.includes(filters.drink);
      const foodMatch = filters.food === "" || cafe.food.includes(filters.food);
      const specMatch = filters.spec === "" || cafe.specs.includes(filters.spec);
      return cityMatch && drinkMatch && foodMatch && specMatch;
    });
    setFilteredCafes(filteredCafes);
  };

  useEffect(() => {
    handleFilter();
  }, [filters]);

  // Handle city filter
  const handleCityFilter = (city) => {
    setFilters((prev) => ({ ...prev, city }));
    handleFilter();
  };

  // Handle drinks filter
  const handleDrinkFilter = (drink) => {
    setFilters((prev) => ({ ...prev, drink }));
    handleFilter();
  };

  // Handle food filter
  const handleFoodFilter = (food) => {
    setFilters((prev) => ({ ...prev, food }));
    handleFilter();
  };

  // Handle specs filter
  const handleSpecFilter = (spec) => {
    setFilters((prev) => ({ ...prev, spec }));
    handleFilter();
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ city: "", drink: "", food: "", spec: "" });
  }

  return (
    <>
      <Helmet>
        <title>{`${filteredCafes.length} Best Cafes for ${formatTopPicks(toppick)} | Sweet Spots`}</title>
        <meta name="description" content={`${formatTopPicks(toppick)} is your purpose. Discover my ${filteredCafes.length} favorite cafes worldwide and find your sweet spot.`} />
      </Helmet>
      <div>
        {toppick && (
          <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
            {formatTopPicks(toppick)} <br /> is your intention.
          </h1>
        )}
        <p className="text-1xl pt-10 px-10 flex justify-center text-center ">
          We exactly know what you are looking for. Explore my {filteredCafes.length} top coffee shops for {formatTopPicks(toppick)}.
        </p>
        <div className="flex justify-center items-center mt-8">
          {/* Search Bar & Filter Toggle Button */}
          <div className="flex flex-row items-center space-x-2">
            <button
              className="bg-blue-500 py-2 px-4 rounded-full"
              onClick={() => setShowPopup(true)}
            >
              <GoFilter size={40} className=" rounded-full hover:bg-white hover:shadow-lg transition duration-300" />
            </button>
          </div>

          {/* Popup for Filters */}
          {showPopup && (
            <FilterPopup
              onCityFilter={handleCityFilter}
              onDrinkFilter={handleDrinkFilter}
              onFoodFilter={handleFoodFilter}
              onSpecFilter={handleSpecFilter}
              setShowPopup={setShowPopup}
            />
          )}
        </div>

        {/* Display selected filters */}
        <div className="mt-4 px-7">
          {Object.entries(filters).map(([key, value]) =>
            value ? (
              <span key={key} className="inline-block border border-grey py-0.5 px-2 mr-2 mb-2 text-sm shadow-md hover:bg-white hover:shadow-lg transition duration-300">
                {value}
                <button
                  onClick={() => {
                    // Clear individual filter
                    setFilters((prev) => ({ ...prev, [key]: "" }));
                  }}
                  className="ml-2"
                >
                  x
                </button>
              </span>
            ) : null
          )}
          {(filters.city || filters.drink || filters.food || filters.spec) && (
            <button
              onClick={clearFilters}
              className="bg-grey border border-grey px-2 py-0.5 mt-1 text-sm shadow-md hover:bg-mint hover:shadow-lg transition duration-300"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="pt-0 pb-7 px-7 flex flex-wrap justify-center mb-20 mt-10">
          {filteredCafes.length === 0 ? (
            <p>Cafes loading...</p>
          ) : (
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
          )}
        </div>
      </div>
    </>
  )
}

export default CafeSpecList