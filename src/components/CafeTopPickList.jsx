import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Searchbar from "./Searchbar";
import FilterPopup from "./PopupFilterCafe";
import { GoFilter } from "react-icons/go";
import { FaMapMarkerAlt, FaGlobe } from "react-icons/fa"; // For location icons

import WishlistButton from '../components/WishlistButton';
import InlineFilterCafe from "./InlineFilterCafe";

// Helmet library for individual SEO title + description
import { Helmet } from "react-helmet-async";

function CafeSpecList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [cafeTopPick, setcafeTopPick] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { toppick } = useParams();
  const topPickToFilter = toppick;

  // State to hold the selected filters' descriptions
  const [filters, setFilters] = useState({
    city: "",
    drink: "",
    food: "",
    spec: ""
  });

  // State to hold the unique filter values
  const [filterValues, setFilterValues] = useState({
    cities: [],
    drinks: [],
    foods: [],
    specs: []
  });

  // Fetch all cafes for selected TopPick, e.g. Girlies Brunch
  const getCafes = () => {
    const topPick = topPickToFilter.replace(/-([a-z])/g, (match, group) => group.toUpperCase());
    axios.get(`${API_URL}/cafes/for/${topPick}`)
      .then((response) => {
        setcafeTopPick(response.data);
        setFilteredCafes(response.data);
        const cities = [...new Set(response.data.map(cafe => cafe.location.city))];
        const drinks = [...new Set(response.data.flatMap(cafe => cafe.drinks))];
        const foods = [...new Set(response.data.flatMap(cafe => cafe.food))];
        const specs = [...new Set(response.data.flatMap(cafe => cafe.specs))];

        // Update the filter values
        setFilterValues({
          cities,
          drinks,
          foods,
          specs
        });
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
  };

  // Search through cafes based on search term, city, drinks, food and specs
  useEffect(() => {
    const filtered = cafeTopPick.filter((cafe) => {
      const titleMatch = cafe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = cafe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const foodMatch = cafe.food.some((food) => food.toLowerCase().includes(searchTerm.toLowerCase()));
      const drinksMatch = cafe.drinks.some((drink) => drink.toLowerCase().includes(searchTerm.toLowerCase()));
      const specsMatch = cafe.specs.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      const cityMatch = cafe.location.city.toLowerCase().includes(searchTerm.toLowerCase());
      const countryMatch = cafe.location.country.toLowerCase().includes(searchTerm.toLowerCase());
      const selectedCityMatch = selectedCity ? cafe.location.city.toLowerCase() === selectedCity.toLowerCase() : true;
      const selectedDrinksMatch = selectedDrink ? cafe.drinks.includes(selectedDrink) : true;
      const selectedFoodMatch = selectedFood ? cafe.food.includes(selectedFood) : true;
      const selectedSpecsMatch = selectedSpec ? cafe.specs.some((spec) => spec.toLowerCase() === selectedSpec.toLowerCase()) : true;

      return (titleMatch || descriptionMatch || cityMatch || countryMatch || foodMatch || drinksMatch || specsMatch) && selectedCityMatch && selectedDrinksMatch && selectedFoodMatch && selectedSpecsMatch;
    });
    setFilteredCafes(filtered);
  }, [searchTerm, selectedCity, selectedDrink, selectedFood, selectedSpec, cafeTopPick]);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'city':
        setSelectedCity(value);
        break;
      case 'drink':
        setSelectedDrink(value);
        break;
      case 'food':
        setSelectedFood(value);
        break;
      case 'spec':
        setSelectedSpec(value);
        break;
      default:
        break;
    }
    setFilters(prev => ({ ...prev, [filterType]: value }));
    // Removed setShowPopup(false) here since FilterPopup has an "Apply" button to close it
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
        <title>{`${filteredCafes.length} Best Cafes for ${formatTopPicks(toppick)} | Sweet Spots`}</title>
        <meta name="description" content={`${formatTopPicks(toppick)} is your purpose. Discover my ${filteredCafes.length} favorite cafes worldwide and find your sweet spot.`} />
      </Helmet>
      <div>
        {toppick && (
          <div className="bg-black text-white uppercase text-center text-3xl px-0.5 py-3 font-extrabold italic flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Empty left column for desktop spacing (hidden on mobile) */}
            <div className="hidden md:block md:w-1/3"></div>

            {/* Center column (headline) */}
            <div className="flex justify-center md:w-1/3">
              <h1 className="text-center">
                <span className="text-teal">{formatTopPicks(toppick)}</span>
                <br /> is your intention.
              </h1>
            </div>

            {/* Right column (search bar) */}
            <div className="flex justify-center md:justify-end md:w-1/3 px-4 mt-4 md:mt-0">
              <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
            </div>
          </div>
        )}

        <p className="text-1xl pt-10 px-10 flex justify-center text-center">
          I got you! Explore my {filteredCafes.length} top coffee shops for {formatTopPicks(toppick)}.
        </p>
        <div className="container mx-auto px-4 mt-6">
          {/* Filters: Inline on desktop, button on mobile */}
          <div className="flex flex-wrap items-center justify-center mb-6">
            {/* Desktop: Show inline filters */}
            <div className="hidden md:flex">
              <InlineFilterCafe
                onCityFilter={(city) => handleFilterChange('city', city)}
                onDrinkFilter={(drink) => handleFilterChange('drink', drink)}
                onFoodFilter={(food) => handleFilterChange('food', food)}
                onSpecFilter={(spec) => handleFilterChange('spec', spec)}
                cities={filterValues.cities}
                drinks={filterValues.drinks}
                foods={filterValues.foods}
                specs={filterValues.specs}
                selectedCity={selectedCity}
                selectedDrink={selectedDrink}
                selectedFood={selectedFood}
                selectedSpec={selectedSpec}
              />
            </div>
            {/* Mobile: Show filter button */}
            <div className="md:hidden flex justify-center">
              <button
                onClick={() => setShowPopup(!showPopup)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition duration-200"
              >
                <GoFilter size={16} />
                Filters
              </button>
            </div>
          </div>

          {/* Mobile Popup */}
          {showPopup && (
            <FilterPopup
              onCityFilter={(city) => handleFilterChange('city', city)}
              onDrinkFilter={(drink) => handleFilterChange('drink', drink)}
              onFoodFilter={(food) => handleFilterChange('food', food)}
              onSpecFilter={(spec) => handleFilterChange('spec', spec)}
              cities={filterValues.cities}
              drinks={filterValues.drinks}
              foods={filterValues.foods}
              specs={filterValues.specs}
              setShowPopup={setShowPopup}
            />
          )}

          {/* Filter Tags Container */}
          <div className="overflow-y-auto">
            <div className="flex flex-wrap justify-center">
              {Object.entries(filters).map(([key, value]) =>
                value && (
                  <span
                    key={key}
                    className="inline-flex items-center border border-gray-300 rounded-full py-0.5 px-2 mr-2 mb-1 text-xs shadow-sm bg-gray-50 hover:bg-white transition duration-300"
                  >
                    {value}
                    <button
                      onClick={() => handleFilterChange(key, "")}
                      className="ml-1"
                    >
                      x
                    </button>
                  </span>
                )
              )}
              {(selectedCity || selectedDrink || selectedFood || selectedSpec) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center bg-gray-100 border border-gray-300 rounded-full py-0.5 px-2 mr-2 mb-1 text-xs shadow-sm hover:bg-gray-200 transition duration-300"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="px-7 flex flex-wrap justify-center">
  {filteredCafes.length > 0 ? (
    filteredCafes.map((cafe) => (
      <div key={cafe._id} className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5">
        <Link to={`/cafes/${cafe.urlSlug}`} className="group">
          <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105">
            <img src={cafe.image} alt={cafe.title} className="h-full w-full object-cover" />
            {/* Overlay Text on Image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 rounded-b-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="flex items-center text-white font-bold text-xs bg-mint/90 text-gray-800 rounded-full px-3 py-1">
                  <FaMapMarkerAlt className="mr-1" />
                  {cafe.location.city}
                </p>
                <p className="flex items-center text-white font-bold text-xs bg-teal/90 rounded-full px-3 py-1">
                  <FaGlobe className="mr-1" />
                  {cafe.location.country}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 z-20">
              <WishlistButton urlSlug={cafe.urlSlug} />
            </div>
          </div>
          {/* Cafe Title Below Image */}
          <p className="text-gray-900 font-bold text-lg mt-1 text-center">
            {cafe.title}
          </p>
        </Link>
      </div>
    ))
  ) : (
    <p className="flex flex-col text-center items-center text-sm my-10 mb-20 gap-3 italic">
      Well... It looks like I haven't found a cafe that exactly matches your criteria yet. <br />Please try another search + filter.
    </p>
  )}
</div>
      </div>
    </>
  );
}

export default CafeSpecList;