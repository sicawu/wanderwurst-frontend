import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import CafeFilterSpecs from "../components/CafeFilterSpecs"


function CafeCityList() {
    const API_URL = import.meta.env.VITE_API_URL
    const { city } = useParams()
    const [cafeCity, setcafeCity] = useState([])
    const [filteredCafes, setFilteredCafes] = useState([])

    const getCityCafes = () => {
        axios.get(`${API_URL}/cafes/city/${city}`)
            .then((response) => {
                setcafeCity(response.data)
                setFilteredCafes(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getCityCafes()
    }, [city])


    // Capitalize the first letter of each word and keep spaces - For Headline in Frontend
    const formatCity = (city) => {
        return city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

     // Update the list based on the filter
     const handleFilter = (filteredCafes) => {
        setFilteredCafes(filteredCafes)
    }    

    return (
        <>
            <div className="my-3">
                {city && (
                    <h1 className="bg-black text-white uppercase text-center text-3xl m-1 px-0.5 py-0.5 font-extrabold italic">
                        Best cafes in {formatCity(city)}
                    </h1>
                )}
                <p className="text-1xl pt-10 px-10 flex justify-center text-center ">
                    Discover a selected collection of my favorite coffee shops in {formatCity(city)}. These little gems brought much joy to my heart while exploring {formatCity(city)}s beauty.
                </p>
                <div className="pt-0 pb-7 px-7 flex flex-wrap justify-center mb-20 mt-10">
                    {cafeCity.length === 0
                        ? <p>No cafes found</p>
                        : cafeCity.map((cafe) => (
                            <div key={cafe._id} className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5">
                                <Link to={`/cafes/${cafe.urlSlug}`} >
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
                    }
                </div>
                <div className="mb-10">
                    <CafeFilterSpecs
                        onFilter={handleFilter}
                        cafes={cafeCity} // Pass the cafes data to the filter component
                    />
                </div>
            </div>
        </>
    )
}

export default CafeCityList