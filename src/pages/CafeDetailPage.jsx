import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link, useParams } from "react-router-dom"
import { FaStar, FaRegCheckCircle } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { MdLocationCity } from "react-icons/md"

import CafeMaps from "../components/CafeMaps.jsx"
import CafeOpeningHours from "../components/CafeOpeningHours.jsx"

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
                setCafe(response.data)
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message)
            })
    };
    useEffect(() => {
        getCafe()
    }, [id])

    /*
    // Delete function
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;
  
    const handleDelete = () => {
      axios
        .delete(`${API_URL}/cafes/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` }, // Send the JWT token to requests header
        })
        .then((response) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    // Calculate average Rating out of all reviews
    const averageRating = () => {
      let sumOfStars = 0;
      cafe.reviews.forEach((review) => {
        sumOfStars += review.stars;
      });
      return sumOfStars / cafe.reviews.length
    }
  
    */

    return (
        <div>
            {cafe === null ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="flex justify-center items-center">
                        <div className="grid md:grid-cols-2 sm:grid-cols-1">
                            <div className="flex justify-center p-10">
                                <img
                                    className="h-full w-full object-cover rounded-2xl"
                                    src={cafe.image}
                                    alt={`${cafe.title}${cafe.location && cafe.location[0] ? `, ${cafe.location[0].city}` : ''}`}
                                />
                            </div>

                            <div>
                                <h1 className="text-5xl p-10 flex justify-center uppercase text-center font-extrabold italic">
                                    {cafe.title}
                                </h1>

                                {/* !!!!! AVERAGE RATING !!!!!! */}
                                {cafe.reviews && cafe.reviews.length > 0 && (
                                    <div className="flex justify-center items-center pb-7">
                                        {[...Array(5)].map((stars, index) => (
                                            <label key={index}>
                                                <input type="radio" name="stars" value={index} />
                                                <FaStar
                                                    className="star"
                                                    size={25}
                                                    color={
                                                        index < averageRating() ? "#ffc107" : "#e4e5e9"
                                                    }
                                                />
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {/* !!!!! DESCRIPTION !!!!!! */}
                                <p className="text-1xl px-10 pb-5 flex justify-center text-center ">
                                    {cafe.description}
                                </p>
                                {/* !!!!! LOCATION !!!!!! */}
                                {cafe.location && cafe.location.length > 0 && (
                                    <div className="px-10 py-5 flex flex-col items-center">
                                        <p className="flex items-center mb-2">
                                            <MdLocationCity className="mr-1 text-xl" />
                                            {cafe.location[0].city}, {cafe.location[0].country}
                                        </p>
                                        <p className="flex items-center">
                                            <FaLocationDot className="mr-1 text-xl" />
                                            {cafe.location[0].address}
                                        </p>
                                    </div>
                                )}
                                {/* !!!!! Specs !!!!!! */}
                                <div className="flex flex-wrap px-10 flex justify-center">
                                    {Array.isArray(cafe.specs) &&
                                        cafe.specs.map((spec, index) => (
                                            <Link
                                                to={`/best-cafes/${spec.toLowerCase().replace(/\s+/g, '-')}`} // Linking to an SEO overview page for a specific spec; to lowercase + replacing empty spaces in specs
                                                className="font-bold bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base leading-6 inline-block"
                                                key={index}>
                                                {spec}
                                            </Link>
                                        ))}
                                </div>
                                {/* !!!!! Food !!!!!! */}
                                <h2 className="text-s pt-10 pb-3 flex justify-center text-center font-extrabold">
                                    Food Options
                                </h2>
                                <div className="flex flex-wrap px-10 justify-center">
                                    {Array.isArray(cafe.food) &&
                                        cafe.food.map((food, index) => (
                                            <span
                                                className="font-bold bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base leading-6 inline-block"
                                                key={index}
                                            >
                                                {food}
                                            </span>
                                        ))}
                                </div>
                                {/* !!!!! Opening hours !!!!!! */}
                                <CafeOpeningHours placeId={cafe.placeId} />

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
                    <CafeMaps />
                </>
            )}
        </div>
    )
}


export default CafeDetailsPage
