import axios from "axios"
import React, { useState, useEffect } from "react"
import CafeFilter from "./FilterCafe"
import Searchbar from "./Searchbar"
import { Link } from "react-router-dom"
import { TbCoffeeOff } from "react-icons/tb"

function CafeList() {
  const API_URL = import.meta.env.VITE_API_URL
  const [allCafes, setAllCafes] = useState([])
  const [filteredCafes, setFilteredCafes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedFood, setSelectedFood] = useState("")

  // Fetch all cafes
  const getAllCafes = () => {
    axios
      .get(`${API_URL}/cafes`)
      .then((response) => {
        setAllCafes(response.data)
        setFilteredCafes(response.data)
      })
      .catch((error) => {
        console.log("Error getting Cafes from the API...")
        console.log(error)
      })
  }

  useEffect(() => {
    getAllCafes()
  }, [])

  // Filter cafes based on search term, city, and food
  useEffect(() => {
    const filtered = allCafes.filter((cafe) => {
      const titleMatch = cafe.title.toLowerCase().includes(searchTerm.toLowerCase())
      const descriptionMatch = cafe.description.toLowerCase().includes(searchTerm.toLowerCase())
      const cityMatch = selectedCity ? cafe.location.city.toLowerCase() === selectedCity.toLowerCase() : true
      const foodMatch = selectedFood ? cafe.food.includes(selectedFood) : true

      return (titleMatch || descriptionMatch) && cityMatch && foodMatch
    });
    setFilteredCafes(filtered);
  }, [searchTerm, selectedCity, selectedFood, allCafes])

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  // Handle city filter
  const handleCityFilter = (city) => {
    setSelectedCity(city)
  }

  // Handle food filter
  const handleFoodFilter = (food) => {
    setSelectedFood(food)
  }

  return (
    <>
      <h1 className="bg-black text-white uppercase text-center text-3xl py-0.5 font-extrabold italic">
        Best Cafes in the world
      </h1>

      {/* Search Bar  & Filter*/}
      <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
      <CafeFilter onCityFilter={handleCityFilter} onFoodFilter={handleFoodFilter} />

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
  )
}

export default CafeList
