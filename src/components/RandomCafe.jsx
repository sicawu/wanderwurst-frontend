import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaGlobe } from "react-icons/fa"; // For location icons

function RandomCafe() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [isHungry, setIsHungry] = useState(false);
    const [cafes, setCafes] = useState([]);
    const [randomCafe, setRandomCafe] = useState(null);
    const [noCafesFound, setNoCafesFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New: Loading state

    useEffect(() => {
        axios.get(`${API_URL}/cities`)
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.error("Error fetching cities:", error);
            });
    }, [API_URL]);

    useEffect(() => {
        let url = `${API_URL}/cafes`;

        const params = new URLSearchParams();
        if (selectedCity) {
            params.append('city', selectedCity);
        }
        if (isHungry) {
            params.append('hungry', true);
        }
        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        axios.get(url)
            .then((response) => {
                const fetchedCafes = response.data;
                setCafes(fetchedCafes);
                setNoCafesFound(fetchedCafes.length === 0);
                setRandomCafe(null);
            })
            .catch((error) => {
                console.error("Error fetching cafes:", error);
                setNoCafesFound(true);
            });
    }, [selectedCity, isHungry, API_URL]);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleHungryChange = (event) => {
        setIsHungry(event.target.checked);
    };

    const getRandomCafe = () => {
        if (cafes.length > 0) {
            setIsLoading(true); // Start loading
            setTimeout(() => { // Simulate a short delay for UX
                const randomIndex = Math.floor(Math.random() * cafes.length);
                setRandomCafe(cafes[randomIndex]);
                setIsLoading(false); // End loading
            }, 500);
        }
    };

    return (
        <div className="flex flex-col justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen pt-10 pb-20">
            <div className="flex flex-col justify-center items-center py-4">
                <h1 className="text-white uppercase text-center text-5xl px-0.5 py-0.5 font-extrabold italic mb-4">
                    Tame the Monster
                </h1>

                <p className="text-sm text-gray-300 italic pb-10 text-center max-w-md">
                    People aren't that yummy.<br />
                    Get some drinks & food in your tummy.
                </p>

                <div className="w-full max-w-md">
                    <div className="mb-6 flex justify-center">
                        <label className="text-white flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={isHungry}
                                onChange={handleHungryChange}
                                className="mr-3 w-4 h-4 text-teal bg-gray-700 border-gray-600 rounded focus:ring-teal"
                            />
                            I'm starving. Get me food!
                        </label>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <select
                            id="city"
                            value={selectedCity}
                            onChange={handleCityChange}
                            className="w-full py-3 px-4 rounded-full shadow-lg bg-white text-black text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal transition duration-200"
                        >
                            <option value="">Select a City (optional)</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={getRandomCafe}
                            className="w-full mb-6 bg-teal hover:bg-teal-600 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cafes.length === 0 || noCafesFound || isLoading}
                        >
                            {isLoading ? "Finding Cafe..." : "Get Random Cafe"}
                        </button>
                    </div>

                    {noCafesFound && (
                        <p className="text-red-400 text-center text-sm">Meow, looks like I don't have a cafe matching your criteria. Change the settings!</p>
                    )}
                </div>

                {/* Cafe Display Area - Only show when loading or cafe is selected */}
                {(isLoading || randomCafe) && (
                    <div className="mt-10 w-full max-w-md flex justify-center items-center animate-fade-in">
                        {isLoading && (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
                                <p className="text-white mt-4">Brewing your perfect spot...</p>
                            </div>
                        )}
                        {!isLoading && randomCafe && (
                            <Link to={`/cafes/${randomCafe.urlSlug}`} className="w-full group">
                                <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105">
                                    <img
                                        src={randomCafe.image}
                                        alt={randomCafe.title}
                                        className="h-full w-full object-cover"
                                    />
                                    {/* Overlay Text on Image */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 rounded-b-2xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="flex items-center text-white font-bold text-sm bg-mint/90 text-gray-800 rounded-full px-3 py-1">
                                                <FaMapMarkerAlt className="mr-1" />
                                                {randomCafe.location.city}
                                            </p>
                                            <p className="flex items-center text-white font-bold text-sm bg-teal/90 rounded-full px-3 py-1">
                                                <FaGlobe className="mr-1" />
                                                {randomCafe.location.country}
                                            </p>
                                        </div>
                                        <p className="text-white font-extrabold text-xl text-center bg-black/50 rounded-lg px-2 py-1">
                                            {randomCafe.title}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RandomCafe;