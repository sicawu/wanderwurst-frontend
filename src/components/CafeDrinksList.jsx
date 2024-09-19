import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import TopPickSection from "../components/SectionTopPick"

// Helmet library for individual SEO title + description
import { Helmet } from "react-helmet-async"

function CafeDrinkList() {
    const API_URL = import.meta.env.VITE_API_URL
    const [filteredCafes, setFilteredCafes] = useState([])
    const [cafeDrinks, setCafeDrinks] = useState([]);
    const [topPick, setTopPick] = useState([])

    const { drinks } = useParams()
    const drinksToFilter = drinks
    const encodedDrinks = encodeURIComponent(drinks)

    const getCafes = () => {
        axios.get(`${API_URL}/cafes/drinks/${encodedDrinks}`)
            .then((response) => {
                setCafeDrinks(response.data)
                setFilteredCafes(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // TopPick Section: Fetch the list of topPick from the API
    useEffect(() => {
        axios.get(`${API_URL}/topPick`)
            .then((response) => setTopPick(response.data))
            .catch((error) => console.error("Error fetching topPick:", error))
    }, [API_URL])

    useEffect(() => {
        getCafes()
    }, [drinksToFilter])

    // Capitalize the first letter of each word and keep spaces - For Headline in Frontend
    const formatDrinks = (drinks) => {
        return drinks.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <>
            <Helmet>
                <title>{`${filteredCafes.length} Best Cafes for ${formatDrinks(drinks)} | Sweet Spots`}</title>
                <meta name="description" content={`Choose your favorite cafe for ${formatDrinks(drinks)}.`} />
            </Helmet>
            <div>
                {drinks && (
                    <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
                        {formatDrinks(drinks)} <br /> - your elixir of the day.
                    </h1>
                )}
                <p className="text-1xl pt-10 px-10 flex justify-center text-center ">
                    Craving {formatDrinks(drinks).toLowerCase()}? Explore my {filteredCafes.length} favorite cafes for that.
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
            <div className="bg-beige">
            <TopPickSection topPick={topPick} icons={{ working, bestCoffee, socializing, girliesBrunch, localPlace, sustainable }} />            </div>
        </>
    )
}

export default CafeDrinkList