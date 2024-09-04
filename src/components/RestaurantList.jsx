import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Searchbar from "../components/Searchbar"

function RestaurantList() {
  const API_URL = import.meta.env.VITE_API_URL
  const [allRestaurants, setAllRestaurants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const getAllRestaurants = () => {
    axios
      .get(`${API_URL}/restaurants`)
      .then((response) => {
        setAllRestaurants(response.data);
      })
      .catch((error) => {
        console.log("Error getting Restaurants from the API...");
        console.log(error);
      })
  }

  useEffect(() => {
    getAllRestaurants();
  }, [])

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  }

  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    const titleMatch = restaurant.title.toLowerCase().includes(searchTerm);
    const cityMatch = restaurant.location.some((location) =>
      location.city.toLowerCase().includes(searchTerm)
    );
    const neighborhoodMatch = restaurant.location.some((location) =>
      location.neighborhood.toLowerCase().includes(searchTerm)
    );
    return titleMatch || cityMatch || neighborhoodMatch;
  })

  return (
    <>
      <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="pt-0 pb-7 px-7 flex flex-wrap justify-center mb-20 mt-10">
        {filteredRrestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5"
          >
            <Link to={`/restaurants/${cafe._id}`}>
              <div className="h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl">
                <img
                  src={restaurant.image}
                  alt={restaurant.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                {restaurant.location[0].city}
              </p>
              <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                {restaurant.location[0].neighborhood}
              </p>
              <p className="font-bold">{restaurant.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default RestaurantList