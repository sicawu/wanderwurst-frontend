import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link, useParams } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6"
import { MdLocationCity } from "react-icons/md"
import { TbBulb } from "react-icons/tb"
import { FaExternalLinkAlt } from 'react-icons/fa'

// Helmet library for individual SEO title + description
// import { Helmet } from "react-helmet"
import { Helmet } from "react-helmet-async"


// GOOGLE Services: Maps & Opening hours
import CafeMaps from "../components/CafeGoogleMaps.jsx"
import CafeOpeningHours from "../components/CafeGoogleOpeningHours.jsx"

//Leaflet Map
import LeafletMap from "../components/CafeLeafletMaps.jsx"
import 'leaflet/dist/leaflet.css'

function CafeDetailsPage() {
    const [cafe, setCafe] = useState("")
    const [errorMessage, setErrorMessage] = useState('')

    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const { id, urlSlug } = useParams()

    // Get data from specific cafe
    const getCafe = () => {
        axios
            .get(`${API_URL}/cafes/${urlSlug}`)
            .then((response) => {
                const cafeData = response.data
                const topPicks = cafeData.topPick
                const iconUrls = topPicks.map((topPick) => topPick.iconUrl)
                setCafe({ ...response.data, location: response.data.location || {} })
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message)
            })
    }

    useEffect(() => {
        getCafe()
    }, [id])

    const iconMap = {
        working: "../icons/Working.png",
        bestCoffee: "../icons/Best-Coffee.png",
        socializing: "../icons/Socializing.png",
        girliesBrunch: "../icons/Girlies-Brunch.png",
        localPlace: "../icons/Local-Place.png",
        sustainable: "../icons/Sustainable.png"
    }

    return (
        <div>
            {cafe === null ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Helmet>
                        <title>{`${cafe.metaTitle || cafe.title} | Sweet Spots`}</title>
                        <meta name="description" content={cafe.metaDescription || cafe.description} />
                    </Helmet>
                    <div className="flex justify-center items-center">
                        <div className="grid md:grid-cols-2 sm:grid-cols-1">
                            <div className="flex justify-center p-10">
                                <img
                                    className="h-[100vh] w-full object-cover rounded-2xl"
                                    src={cafe.image}
                                    alt={`${cafe.title}${cafe.location && cafe.location.city ? `, ${cafe.location.city}, ${cafe.location.country}` : ''}`}
                                />
                            </div>

                            <div>
                                <h1 className="text-5xl p-10 flex justify-center uppercase text-center font-extrabold italic">
                                    {cafe.title}
                                </h1>
                                {/* !!!!! ICONS FOR TOP PICKS !!!!!! */}
                                <div className="flex flex-row justify-center mb-10 gap-5">
                                    {cafe.topPick && cafe.topPick.map((topPick, index) => {
                                        const iconUrl = iconMap[topPick];
                                        const urlText = topPick.replace(/([A-Z])/g, '-$1').toLowerCase()
                                        return (
                                            <Link
                                                to={`/best-cafes/for/${urlText}`}
                                                key={index}
                                                className="relative group"
                                            >
                                                <div className="w-12 h-12"
                                                    key={index}>
                                                    <img
                                                        src={iconUrl}
                                                        alt={topPick}
                                                        className="w-full h-full border-2 rounded-full object-cover object-center hover:bg-white hover:shadow-xl"
                                                    />
                                                </div>
                                                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                                                    Top Pick for {topPick.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                </span>
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* !!!!! DESCRIPTION !!!!!! */}
                                <p className="text-1xl px-10 pb-5 flex justify-center text-center ">
                                    {cafe.description}
                                </p>

                                {/* !!!!! RECOMMENDATION !!!!!! */}
                                {cafe.recommendation && (
                                    <p className="text-1xl px-10 pb-5 flex justify-center text-center">
                                        <TbBulb size={30} className="mr-1" />
                                        <span className="font-bold nowrap">MUST TRY:&nbsp;</span>
                                        {cafe.recommendation}
                                    </p>
                                )}

                                {/* !!!!! Specs !!!!!! */}
                                <div className="flex flex-wrap px-10 flex justify-center">
                                    {Array.isArray(cafe.specs) &&
                                        cafe.specs.map((spec, index) => (
                                            <Link
                                                to={`/best-cafes/${spec.toLowerCase().replace(/\s+/g, '-')}`} // Linking to an SEO overview page for a specific spec; to lowercase + replacing empty spaces in specs
                                                className="font-bold bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base leading-6 inline-block hover:bg-green hover:shadow-xl"
                                                key={index}>
                                                {spec}
                                            </Link>
                                        ))}
                                </div>

                                {/* !!!!! DELETE & EDIT BUTTONS !!!!!! 
                                {isLoggedIn === true ? (
                                    <div className="px-10 py-10 flex justify-center">
                                        <div className="flex flex-col sm:flex-row">
                                            <button
                                                className="flex justify-center align-center bg-grey hover:bg-red text-white font-semibold py-2 px-10 border border-grey-200 shadow"
                                                onClick={handleDelete}
                                            > Delete Café
                                            </button>
                                            <button
                                                className="flex justify-center align-center bg-black hover:bg-grey text-white font-semibold py-2 px-12 border border-black-200 shadow"
                                                onClick={() => navigate(`/cafes/edit/${id}`)}
                                            > Edit Café
                                            </button>
                                        </div>
                                    </div>
                                ) : null} */}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center bg-grey mt-10 pt-10 pb-16">
                        <div className="grid md:grid-cols-2 sm:grid-cols-1">
                            <div>
                                {/* !!!!! Drinks !!!!!! */}
                                {Array.isArray(cafe.drinks) &&
                                    cafe.drinks.length > 0 && (
                                        <>
                                            <h2 className="text-s pt-10 pb-3 flex justify-center text-center font-extrabold">
                                                Drinks Options
                                            </h2>
                                            <div className="flex flex-wrap px-10 justify-center">
                                                {cafe.drinks.map((drinks, index) => (
                                                    <Link
                                                        to={`/best-cafes/drinks/${drinks.toLowerCase().replace(/\s+/g, '-')}`} // Linking to an SEO overview page for a specific drinks; to lowercase + replacing empty spaces in food
                                                        className="font-bold bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base leading-6 inline-block hover:bg-black hover:shadow-xl"
                                                        key={index}
                                                    >
                                                        {drinks}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                {/* !!!!! Food !!!!!! */}
                                {Array.isArray(cafe.food) &&
                                    cafe.food.length > 0 && (
                                        <>
                                            <h2 className="text-s pt-10 pb-3 flex justify-center text-center font-extrabold">
                                                Food Options
                                            </h2>
                                            <div className="flex flex-wrap px-10 justify-center">
                                                {cafe.food.map((food, index) => (
                                                    <Link
                                                        to={`/best-cafes/food/${food.toLowerCase().replace(/\s+/g, '-')}`} // Linking to an SEO overview page for a specific food; to lowercase + replacing empty spaces in food
                                                        className="font-bold bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base leading-6 inline-block hover:bg-black hover:shadow-xl"
                                                        key={index}
                                                    >
                                                        {food}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                {/* !!!!! LOCATION !!!!!! */}
                                <h2 className="text-s pt-10 pb-3 flex justify-center text-center font-extrabold">
                                    How To Get There
                                </h2>
                                {cafe.location && (
                                    <div className="px-10 pb-5 flex flex-col items-center">
                                        {cafe.location.city && cafe.location.country && (
                                            <p className="flex items-center mb-2">
                                                <MdLocationCity className="mr-1 text-xl" />
                                                {cafe.location.city}, {cafe.location.country}
                                            </p>
                                        )}
                                        {cafe.location.address && (
                                            <p className="flex items-center">
                                                <FaLocationDot className="mr-1 text-xl" />
                                                {cafe.location.address}
                                            </p>
                                        )}
                                        {cafe.linkGoogleMaps && (
                                            <a
                                                href={cafe.linkGoogleMaps}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 underline flex items-center text-blue-500 hover:text-blue-700"
                                            >
                                                <span className="mr-2">Open in Google Maps</span>
                                                <FaExternalLinkAlt className="text-lg" />
                                            </a>
                                        )}
                                    </div>
                                )}
                                {/* !!!!! Opening hours !!!!!! */}
                                <h2 className="text-s pt-10 pb-3 flex justify-center text-center font-extrabold">
                                    Opening Hours
                                </h2>
                                <CafeOpeningHours placeId={cafe.placeId} />
                            </div>
                            <div className="flex justify-center items-center">
                                <LeafletMap cafe={cafe} className="w-full h-full pt-10" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CafeDetailsPage