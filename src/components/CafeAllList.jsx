import React, { useState, useEffect } from "react"
import axios from "axios"
import Searchbar from "./Searchbar"
import FilterPopup from "./PopupFilterCafe"
import TopPickSection from "../components/SectionTopPick"
import { Link } from "react-router-dom"
import { TbCoffeeOff } from "react-icons/tb"
import { GoFilter } from "react-icons/go"

function CafeList() {
  const API_URL = import.meta.env.VITE_API_URL
  const [allCafes, setAllCafes] = useState([])
  const [topPick, setTopPick] = useState([])
  const [filteredCafes, setFilteredCafes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDrinks, setSelectedDrinks] = useState("")
  const [selectedFood, setSelectedFood] = useState("")
  const [selectedSpecs, setSelectedSpecs] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  // State to hold the selected filters' descriptions
  const [filters, setFilters] = useState({
    city: "",
    drinks: "",
    food: "",
  })

  // Fetch all cafes
  const getAllCafes = () => {
    axios.get(`${API_URL}/cafes`)
      .then((response) => {
        setAllCafes(response.data)
        setFilteredCafes(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllCafes()
  }, [])


  // Fetch the list of topPick from the API
  useEffect(() => {
    axios.get(`${API_URL}/topPick`)
      .then((response) => setTopPick(response.data))
      .catch((error) => console.error("Error fetching topPick:", error))
  }, [API_URL])


  // Search through cafes based on search term, city, drinks, food and specs
  useEffect(() => {
    const filtered = allCafes.filter((cafe) => {
      const titleMatch = cafe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = cafe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const cityMatch = selectedCity ? cafe.location.city.toLowerCase() === selectedCity.toLowerCase() : true;
      const drinksMatch = selectedDrinks ? cafe.drinks.includes(selectedDrinks) : true;
      const foodMatch = selectedFood ? cafe.food.includes(selectedFood) : true;
      const specsMatch = cafe.specs.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));

      return (titleMatch || descriptionMatch || specsMatch) && cityMatch && drinksMatch && foodMatch;
    })
    setFilteredCafes(filtered)
  }, [searchTerm, selectedCity, selectedDrinks, selectedFood, selectedSpecs, allCafes])

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  // Handle city filter
  const handleCityFilter = (city) => {
    setSelectedCity(city)
    setFilters((prev) => ({ ...prev, city }))
  }

  // Handle drinks filter
  const handleDrinksFilter = (drinks) => {
    setSelectedDrinks(drinks)
    setFilters((prev) => ({ ...prev, drinks }))
  }

  // Handle food filter
  const handleFoodFilter = (food) => {
    setSelectedFood(food)
    setFilters((prev) => ({ ...prev, food }))
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCity("")
    setSelectedDrinks("")
    setSelectedFood("")
    setFilters({ city: "", drinks: "", food: "" })
  }

  return (
    <>
      <h1 className="bg-black text-white uppercase text-center text-3xl py-0.5 font-extrabold italic">
        Top {filteredCafes.length} Cafes in the world
      </h1>
      <div className="flex justify-center items-center mt-8">
        {/* Search Bar & Filter Toggle Button */}
        <div className="flex flex-row items-center space-x-2">
          <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
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
            onDrinkFilter={handleDrinksFilter}
            onFoodFilter={handleFoodFilter}
            setShowPopup={setShowPopup}
          />
        )}
      </div>

      {/* Display selected filters */}
      <div className="mt-4 px-7">
        {Object.entries(filters).map(([key, value]) =>
          value ? (
            <span key={key} className="inline-block border border-grey py-0.5 px-2 mr-2 mb-2 text-sm shadow-md hover:bg-white hover:shadow-lg transition duration-300">
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              <button
                onClick={() => {
                  // Clear individual filter
                  setFilters((prev) => ({ ...prev, [key]: "" }));
                  if (key === "city") setSelectedCity("");
                  if (key === "drinks") setSelectedDrinks("");
                  if (key === "food") setSelectedFood("");
                }}
                className="ml-2"
              >
                x
              </button>
            </span>
          ) : null
        )}
        {(selectedCity || selectedDrinks || selectedFood) && (
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
                <div className="h-80 w-full max-w-full overflow-hidden border-solid rounded-2xl">
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
          <p className="flex flex-col text-center items-center text-sm my-10 mb-20 gap-3">
            <TbCoffeeOff size={30} />
            <br /> Well... It looks like I haven't found a cafe that exactly matches your criteria - YET! <br />Please try another search + filter.
          </p>
        )}
      </div>
      <div className="bg-beige">
        <TopPickSection topPick={topPick} />
      </div>
    </>
  )
}

export default CafeList