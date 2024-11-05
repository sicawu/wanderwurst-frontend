import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import FilterPopup from "./PopupFilterCafe";
import { Link } from "react-router-dom";
import { TbCoffeeOff } from "react-icons/tb";
import { GoFilter } from "react-icons/go";
import WishlistButton from '../components/WishlistButton';
import { Helmet } from "react-helmet-async";

const CafeList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [allCafes, setAllCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [filters, setFilters] = useState({
    city: "",
    drink: "",
    food: "",
    spec: "",
  });

  const [filterValues, setFilterValues] = useState({
    cities: [],
    drinks: [],
    foods: [],
    specs: [],
  });

  const getAllCafes = () => {
    axios
      .get(`${API_URL}/cafes`)
      .then((response) => {
        const cafesData = response.data;
        setAllCafes(cafesData);
        setFilteredCafes(cafesData);
        setFilterValues({
          cities: [...new Set(cafesData.map(cafe => cafe.location.city))],
          drinks: [...new Set(cafesData.flatMap(cafe => cafe.drinks))],
          foods: [...new Set(cafesData.flatMap(cafe => cafe.food))],
          specs: [...new Set(cafesData.flatMap(cafe => cafe.specs))],
        });
      })
      .catch(console.error);
  };

  useEffect(() => {
    getAllCafes();
  }, []);

  useEffect(() => {
    const filtered = allCafes.filter(cafe => {
      const matchesSearchTerm = [cafe.title, cafe.description, cafe.location.city, cafe.location.country]
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase())) ||
        cafe.food.some(food => food.toLowerCase().includes(searchTerm.toLowerCase())) ||
        cafe.drinks.some(drink => drink.toLowerCase().includes(searchTerm.toLowerCase())) ||
        cafe.specs.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilters =
        (!selectedCity || cafe.location.city.toLowerCase() === selectedCity.toLowerCase()) &&
        (!selectedDrink || cafe.drinks.includes(selectedDrink)) &&
        (!selectedFood || cafe.food.includes(selectedFood)) &&
        (!selectedSpec || cafe.specs.includes(selectedSpec.toLowerCase()));

      return matchesSearchTerm && matchesFilters;
    });
    setFilteredCafes(filtered);
  }, [searchTerm, selectedCity, selectedDrink, selectedFood, selectedSpec, allCafes]);

  const handleSearch = (event) => setSearchTerm(event.target.value);

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
  };

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
          content="Discover my favorite cafes worldwide. Carefully curated, your little safe space in the world."
        />
      </Helmet>
      <h1 className="bg-black text-white uppercase text-center text-3xl py-0.5 font-extrabold italic">
      <span className="text-teal">{filteredCafes.length} Best Cafes</span>
      <br />in the World
      </h1>
      <div className="flex justify-center items-center mt-8">
        <div className="flex flex-row items-center space-x-2">
          <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
            className="py-2 px-4 rounded-full"
            onClick={() => setShowPopup(true)}
          >
            <GoFilter size={40} className="rounded-full hover:bg-white hover:shadow-lg transition duration-300" />
          </button>
        </div>
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
      </div>

      <div className="mt-4 px-7">
        {Object.entries(filters).map(([key, value]) =>
          value && (
            <span
              key={key}
              className="inline-block border border-grey py-0.5 px-2 mr-2 mb-2 text-sm shadow-md hover:bg-white hover:shadow-lg transition duration-300"
            >
              {value}
              <button
                onClick={() => handleFilterChange(key, "")}
                className="ml-2"
              >
                x
              </button>
            </span>
          )
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
          filteredCafes.map(cafe => (
            <div key={cafe._id} className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5">
              <div className="relative h-72 w-full max-w-full rounded-2xl border-solid">
                <Link to={`/cafes/${cafe.urlSlug}`} className="h-full w-full block">
                  <img src={cafe.image} alt={cafe.title} className="h-full w-full object-cover border-solid rounded-2xl" />
                </Link>
                <div className="absolute top-4 right-4 z-20">
                  <WishlistButton urlSlug={cafe.urlSlug} />
                </div>
              </div>
              <Link to={`/cafes/${cafe.urlSlug}`} className="h-full w-full mt-2 block">
                <p className="font-bold uppercase bg-mint text-gray-800 rounded-full mb-1 mr-1 px-2 py-1 inline-block">
                  {cafe.location.city}
                </p>
                <p className="font-bold uppercase bg-teal text-white rounded-full mb-1 px-2 py-1 inline-block">
                  {cafe.location.country}
                </p>
                <p className="font-bold text-gray-900">{cafe.title}</p>
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
};

export default CafeList;
