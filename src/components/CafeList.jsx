import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Searchbar from "../components/Searchbar"
import CafeFilter from "../components/CafeFilter"

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
        setFilteredCafes(response.data);  // Initialize filtered cafes with all cafes
      })
      .catch((error) => {
        console.log("Error getting Cafes from the API...")
        console.log(error)
      })
  }

  useEffect(() => {
    getAllCafes();
  }, [])

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  }

  useEffect(() => {
    const filtered = allCafes.filter((cafe) => {
      const titleMatch = cafe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const cityMatch = cafe.location.some((location) =>
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const countryMatch = cafe.location.some((location) =>
        location.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return titleMatch || cityMatch || countryMatch;
    });
    setFilteredCafes(filtered);
  }, [searchTerm, allCafes]);

  const handleFilter = (filteredCafes) => {
    setFilteredCafes(filteredCafes);  // Update the list based on the filter
  };

  return (
    <>
      <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
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
              <p className="font-bold uppercase bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                {cafe.location[0].city}
              </p>
              <p className="font-bold uppercase bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                {cafe.location[0].country}
              </p>
              <p className="font-bold">{cafe.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="mb-10">
        <CafeFilter
          onFilter={handleFilter}
        />
      </div>

    </>
  );
}

export default CafeList