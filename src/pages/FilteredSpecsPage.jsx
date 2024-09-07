import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

function FilterBySpecsPage() {
    const API_URL = import.meta.env.VITE_API_URL
    const { specs } = useParams()
    const specToFilter = specs

    const [cafeSpec, setCafeSpec] = useState([])
    console.log(specToFilter)

    const getCafes = () => {
        axios.get(`${API_URL}/cafes/tag/${specs}`)
            .then((response) => {
                setCafeSpec(response.data) // Ensure this matches your response structure
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getCafes()
    }, [specToFilter])


    // Capitalize the first letter of each word and keep spaces - For Headline in Frontend
    const formatSpecs = (specs) => {
        return specs.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <>
            {specs && (
                <h1 className="bg-black text-white uppercase text-center text-3xl m-1 px-0.5 py-0.5 font-extrabold italic">
                    {formatSpecs(specs)} <br /> is what you need.
                </h1>
            )}
            <p className="text-1xl px-10 pb-5 flex justify-center text-center ">
                No worries, we've got you sorted. Discover all {formatSpecs(specs)} cafes.
            </p>
            <div className="pt-0 pb-7 px-7 flex flex-wrap justify-center mb-20 mt-10">
                {cafeSpec.length === 0
                    ? <p>Cafes loading</p>
                    : cafeSpec.map((cafe) => (
                        <div key={cafe._id} className="grid py-2 px-1 my-5 bg-onyx bg-opacity-10 hover:border-black hover:border rounded-lg">
                            <Link to={`/cafes/${cafe.urlSlug}`} >
                                <div className="h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl">
                                    <img
                                        src={cafe.image}
                                        alt={cafe.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                                    {cafe.location[0].city}
                                </p>
                                <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                                    {cafe.location[0].neighborhood}
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