// CafeList.js
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import CafeFilter from "./FilterCafeCity";
import FilterCafeFood from "./FilterCafeFood"; // Import the new food filter component

function CafeList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [allCafes, setAllCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };

  useEffect(() => {
    const filtered = allCafes.filter((cafe) => {
      const titleMatch = cafe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = cafe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const cityMatch = cafe.location && cafe.location.city && cafe.location.city.toLowerCase().includes(searchTerm.toLowerCase());
      const countryMatch = cafe.location && cafe.location.country && cafe.location.country.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || descriptionMatch || cityMatch || countryMatch;
    });
    setFilteredCafes(filtered);
  }, [searchTerm, allCafes]);

  const handleCityFilter = (filteredCafes) => {
    setFilteredCafes(filteredCafes);  // Update the list based on the city filter
  };

  const handleFoodFilter = (filteredCafes) => {
    setFilteredCafes(filteredCafes); // Update the list based on the food filter
  };

  return (
    <>
      <h1 className="bg-black text-white uppercase text-center text-3xl py-0.5 font-extrabold italic">
        Best Cafes in the world
      </h1>
      <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
      {/* Add Food Filter */}
      <FilterCafeFood cafes={allCafes} onFilter={handleFoodFilter} />
      {/* Existing City Filter */}
      <div className="mb-10">
        <CafeFilter onFilter={handleCityFilter} />
      </div>
      <div className="pt-0 px-7 flex flex-wrap justify-center mt-10">
        {filteredCafes.map((cafe) => (
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
        ))}
      </div>
    </>
  );
}

export default CafeList;
