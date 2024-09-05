import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

function FilterBySpecsPage() {
    const API_URL = import.meta.env.VITE_API_URL
    const { specs } = useParams()
    const specToFilter = specs

    const [cafeTag, setCafeTag] = useState([])

    const getCafes = () => {
        axios.get(`${API_URL}/cafes/${specToFilter}`)
            .then((response) => {
                setCafeTag(response.data); // Ensure this matches your response structure
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getCafes()
    }, [specToFilter])

    const formatSpecs = (specs) => {
        // Capitalize the first letter of each word and keep spaces
        return specs.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <>
            {specs && (
                <h1 className="text-5xl text-blue font-league m-4 p-4">
                    {formatSpecs(specs)} <br /> is what you need.
                </h1>
            )}
            <p className="text-xs h-12 font-sanchez py-1">
                No worries, we've got you sorted. Discover all {formatSpecs(specs)} cafes.
            </p>
            <div className="lavatory-body items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cafeTag.length === 0
                    ? <p>Cafes loading</p>
                    : cafeTag.map((cafe) => (
                        <div key={cafe._id} className="grid py-2 px-1 my-5 bg-onyx bg-opacity-10 hover:border-black hover:border rounded-lg">
                            <Link to={`/cafes/${cafe._id}`} className="flex flex-col h-full">
                                <div className="h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl">
                                    <img
                                        src={cafe.image}
                                        alt={cafe.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                                    {cafe.location[0]?.city}
                                </p>
                                <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                                    {cafe.location[0]?.neighborhood}
                                </p>
                                <p className="font-bold">{cafe.title}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default FilterBySpecsPage