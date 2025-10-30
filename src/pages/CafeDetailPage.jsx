import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6"
import { MdLocationCity } from "react-icons/md"
import { TbBulb } from "react-icons/tb"
import { FaExternalLinkAlt } from 'react-icons/fa'
import YouMayAlsoLike from '../components/CafesYouMayAlsoLike'
import WishlistButton from '../components/WishlistButton'

// Helmet library for individual SEO title + description
import { Helmet } from "react-helmet-async"

// GOOGLE Services: Maps & Opening hours
// import CafeMaps from "../components/CafeGoogleMaps.jsx"
import CafeOpeningHours from "../components/CafeGoogleOpeningHours.jsx"
import GoogleRatingStars from "../components/GoogleRatingStars.jsx"

//Leaflet Map
import LeafletMap from "../components/CafeLeafletMaps.jsx"
import 'leaflet/dist/leaflet.css'

function CafeDetailsPage() {
    const [cafe, setCafe] = useState("")
    const [errorMessage, setErrorMessage] = useState('')
    const [cafeSuggestions, setcafeSuggestions] = useState([])
    const [filteredCafes, setFilteredCafes] = useState([])
    const [isWished, setIsWished] = useState(false) // Cafe on Wishlist or not

    const API_URL = import.meta.env.VITE_API_URL
    const { urlSlug } = useParams()

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsWished(storedWishlist.includes(urlSlug));

        getCafe();
    }, [urlSlug]);

    // Get data from specific cafe
    const getCafe = () => {
        axios
            .get(`${API_URL}/cafes/${urlSlug}`)

            .then((response) => {
                const cafeData = response.data
                console.log(cafeData)
                const topPicks = cafeData.topPick
                const iconUrls = topPicks.map((topPick) => topPick.iconUrl)
                setCafe({ ...cafeData, location: response.data.location || {} })
                setcafeSuggestions(cafeData.cafeSuggestions)
            })
            .catch((err) => {
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                } else {
                    setErrorMessage('An error occurred while fetching cafe data')
                }
            })
    }

    useEffect(() => {
        getCafe()
    }, [urlSlug])

    const iconMap = {
        working: "../icons/Working.png",
        bestCoffee: "../icons/Best-Coffee.png",
        socializing: "../icons/Socializing.png",
        girliesBrunch: "../icons/Girlies-Brunch.png",
        localPlace: "../icons/Local-Place.png",
        sustainable: "../icons/Sustainable.png"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {cafe === null ? (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-lg text-gray-600">Loading...</p>
                </div>
            ) : (
                <>
                    <Helmet>
                        <title>{`${cafe.metaTitle || cafe.title} | Sweet Spots`}</title>
                        <meta name="description" content={cafe.metaDescription || cafe.description} />
                    </Helmet>

                    {/* Breadcrumb Navigation */}
                    <div className="flex items-center space-x-2 text-gray-600 text-sm px-4 sm:px-6 pt-4 sm:pt-6">
                        <Link to="/" className="hover:underline text-gray-500 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        {cafe.location?.city ? (
                            <>
                                <Link
                                    to={`/best-cafes/city/${cafe.location.city.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="hover:underline text-gray-500 transition-colors"
                                >
                                    {cafe.location.city}
                                </Link>
                                <span>/</span>
                            </>
                        ) : null}
                        <span className="text-black underline text-teal">{cafe.title}</span>
                    </div>

                    {/* Main Content Grid */}
                    <div className="flex flex-col md:flex-row justify-center items-start px-4 sm:px-6 py-6">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 flex justify-center p-4 relative">
                            <div className="relative w-full max-w-md md:max-w-none">
                                <img
                                    className="h-96 sm:h-[32rem] md:h-[90vh] w-full object-cover rounded-2xl shadow-lg"
                                    src={cafe.image}
                                    alt={`${cafe.title}${cafe.location && cafe.location.city ? `, ${cafe.location.city}, ${cafe.location.country}` : ''}`}
                                />
                                {/* Wishlist Button */}
                                <div className="absolute top-4 right-4 z-10">
                                    <WishlistButton
                                        urlSlug={urlSlug}
                                        isWished={isWished} // Pass the isWished state if needed
                                        setIsWished={setIsWished} // Pass the setter if you need to update it
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 p-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center uppercase font-extrabold italic mb-2 text-gray-900">
                                {cafe.title}
                            </h1>

                            {cafe.googleRating && (
                                <div className="flex flex-col items-center text-center mb-6">
                                    <GoogleRatingStars rating={cafe.googleRating} />
                                    <p className="text-sm text-gray-600 mt-1">
                                        Based on <span className="font-semibold">Google Reviews</span>
                                    </p>
                                </div>
                            )}


                            {/* Top Picks Icons */}
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                {cafe.topPick && cafe.topPick.map((topPick, index) => {
                                    const iconUrl = iconMap[topPick];
                                    const urlText = topPick.replace(/([A-Z])/g, '-$1').toLowerCase()
                                    return (
                                        <Link
                                            to={`/best-cafes/for/${urlText}`}
                                            key={index}
                                            className="relative group"
                                        >
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-teal overflow-hidden hover:shadow-xl transition-shadow">
                                                <img
                                                    src={iconUrl}
                                                    alt={topPick}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                                                />
                                            </div>
                                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                                                Top Pick for {topPick.replace(/([a-z])([A-Z])/g, '$1 $2').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                            </span>
                                        </Link>
                                    )
                                })}
                            </div>

                            {/* Description */}
                            <p className="text-lg sm:text-xl text-center text-gray-700 mb-6 leading-relaxed">
                                {cafe.description}
                            </p>

                            {/* Recommendation */}
                            {cafe.recommendation && (
                                <div className="bg-yellow-100 p-4 rounded-lg mb-6">
                                    <div className="flex justify-center items-center text-lg sm:text-xl font-bold text-center mb-2">
                                        <TbBulb size={24} className="mr-2 text-yellow-600" />
                                        MUST TRY:
                                    </div>
                                    <p className="text-center text-gray-800">
                                        {cafe.recommendation}
                                    </p>
                                </div>
                            )}

                            {/* Specs */}
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {Array.isArray(cafe.specs) && cafe.specs
                                    .slice()
                                    .sort((a, b) => a.localeCompare(b))
                                    .map((spec, index) => (
                                        <Link
                                            to={`/best-cafes/${spec.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="font-bold bg-black text-white rounded-full px-3 py-1 text-sm hover:bg-teal transition-colors"
                                            key={index}
                                        >
                                            {spec}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="bg-white py-12 px-4 sm:px-6">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Drinks, Food, Hours */}
                            <div>
                                {/* Drinks */}
                                {Array.isArray(cafe.drinks) && cafe.drinks.length > 0 && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-extrabold uppercase text-center mb-4 text-gray-900">Drinks Options</h2>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {cafe.drinks
                                                .slice()
                                                .sort((a, b) => a.localeCompare(b))
                                                .map((drink, index) => (
                                                    <Link
                                                        to={`/best-cafes/drinks/${drink.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className="font-bold bg-coral text-white rounded-full px-3 py-1 text-sm hover:bg-black transition-colors"
                                                        key={index}
                                                    >
                                                        {drink}
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Food */}
                                {Array.isArray(cafe.food) && cafe.food.length > 0 && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-extrabold uppercase text-center mb-4 text-gray-900">Food Options</h2>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {cafe.food
                                                .slice()
                                                .sort((a, b) => a.localeCompare(b))
                                                .map((food, index) => (
                                                    <Link
                                                        to={`/best-cafes/food/${food.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className="font-bold bg-olive text-white rounded-full px-3 py-1 text-sm hover:bg-black transition-colors"
                                                        key={index}
                                                    >
                                                        {food}
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Opening Hours */}
                                <div>
                                    <h2 className="text-2xl font-extrabold uppercase text-center mb-4 text-gray-900">Opening Hours</h2>
                                    <CafeOpeningHours placeId={cafe.placeId} />
                                </div>
                            </div>

                            {/* Right Column: Location and Map */}
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl font-extrabold uppercase text-center mb-4 text-gray-900">How To Get There</h2>
                                {cafe.location && (
                                    <div className="mb-6 text-center">
                                        {cafe.location.city && cafe.location.country && (
                                            <p className="flex items-center justify-center mb-2 text-gray-700">
                                                <MdLocationCity className="mr-2 text-xl" />
                                                {cafe.location.city}, {cafe.location.country}
                                            </p>
                                        )}
                                        {cafe.location.address && (
                                            <p className="flex items-center justify-center text-gray-700">
                                                <FaLocationDot className="mr-2 text-xl" />
                                                {cafe.location.address}
                                            </p>
                                        )}
                                        {cafe.linkGoogleMaps && (
                                            <a
                                                href={cafe.linkGoogleMaps}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                                            >
                                                <span className="mr-2">Open in Google Maps</span>
                                                <FaExternalLinkAlt className="text-lg" />
                                            </a>
                                        )}
                                    </div>
                                )}
                                <div className="flex items-center justify-center w-full h-full sm:h-96 rounded-lg overflow-hidden shadow-lg overflow-hidden">
                                    <LeafletMap cafe={cafe} className="pt-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* Suggestions Section */}
            {cafeSuggestions && <YouMayAlsoLike cafeSuggestions={cafeSuggestions} />}
        </div>
    )
}

export default CafeDetailsPage