import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import CafeFilter from "./FilterCafeCity"


function CafeFoodList() {
    const API_URL = import.meta.env.VITE_API_URL
    const [filteredCafes, setFilteredCafes] = useState([])
    const [cafeFood, setCafeFood] = useState([])
    const [city, setCity] = useState("")
    const { food } = useParams()
    const foodToFilter = food

    const getCafes = () => {
        axios.get(`${API_URL}/cafes/food/${food}`)
            .then((response) => {
                setCafeFood(response.data)
                setFilteredCafes(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getCafes()
    }, [foodToFilter])


    // Capitalize the first letter of each word and keep spaces - For Headline in Frontend
    const formatFood = (food) => {
        return food.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

     // Update the list based on the filter
    const handleFilter = (filteredCafes) => {
        setFilteredCafes(filteredCafes)
    }

      // Filter cafes by city

  const handleCityChange = (city) => {
    setCity(city);
    const filteredCafes = cafeFood.filter((cafe) => cafe.location.city === city)
    setFilteredCafes(filteredCafes)
  }

    return (
        <>
            <div>
                {food && (
                    <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
                        {formatFood(food)} <br /> is your food preference.
                    </h1>
                )}
                <p className="text-1xl pt-10 px-10 flex justify-center text-center ">
                   If there's one thing in the world I don't make jokes about, then it is food. For me, it decides if the the day's gonna be great - or not. Choose your favorite cafe with {formatFood(food)}.
                </p>
                {/*
                <div className="mb-10">
                    <CafeFilter
                        onFilter={handleFilter}
                        cafes={cafeFood} // Pass the cafes data to the filter component
                        onCityChange={handleCityChange}
                    />
                </div>
                */}
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

export default CafeFoodList