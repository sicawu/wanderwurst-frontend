import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RandomCafe() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [cities, setCities] = useState([]); // Store the list of cities
    const [selectedCity, setSelectedCity] = useState("");
    const [isHungry, setIsHungry] = useState(false); // Store hungry checkbox state
    const [cafes, setCafes] = useState([]);
    const [randomCafe, setRandomCafe] = useState(null);
    const [noCafesFound, setNoCafesFound] = useState(false); // Add a state for no cafes found

    // Fetch available cities from the database on component mount
    useEffect(() => {
        axios.get(`${API_URL}/cities`)
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.error("Error fetching cities:", error);
            });
    }, [API_URL]);

    // Fetch cafes based on the selected city or fetch all cafes if no city is selected
    useEffect(() => {
        let url = `${API_URL}/cafes`;

        // Add query params based on selectedCity and isHungry
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

                // Check if there are no cafes found and update state
                if (fetchedCafes.length === 0) {
                    setNoCafesFound(true);
                } else {
                    setNoCafesFound(false);
                }

                setRandomCafe(null); // Reset randomCafe on new fetch
            })
            .catch((error) => {
                console.error("Error fetching cafes:", error);
                setNoCafesFound(true);
            });
    }, [selectedCity, isHungry, API_URL]);

    // Handle city selection
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    // Handle hungry checkbox change
    const handleHungryChange = (event) => {
        setIsHungry(event.target.checked);
    };

    // Get a random cafe from the list of cafes
    const getRandomCafe = () => {
        if (cafes.length > 0) {
            const randomIndex = Math.floor(Math.random() * cafes.length);
            setRandomCafe(cafes[randomIndex]);
        }
    };

    return (
        <div className="bg-grey min-h-screen flex flex-col justify-center items-center pb-20">
            <h1 className="text-5xl text-white p-10 flex justify-center uppercase text-center font-extrabold" style={{ textShadow: "0px 0px 20px rgba(0,0,0,0.5)" }}>
                Tame the Monster
            </h1>
            <div className="flex flex-col items-center justify-center">
                <p className="text-sm italic pb-10 px-10 flex justify-center text-center">
                People aren't that jummy.<br />
                Get some drinks & food in your tummy.
                </p>

                
                {/* Hungry Checkbox */}
                <div className="mb-5">
                    <label className="flex items-center space-x-4">
                        <input
                            type="checkbox"
                            checked={isHungry}
                            onChange={handleHungryChange}
                            className="mr-2"
                        />
                        I'm starving. Get me food!
                    </label>
                </div>

                {/* City Selection */}
                <div className="mb-5">
                    <select
                        id="city"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="w-60 py-2 px-4 rounded-full shadow-md"
                    >
                        <option value="">Select a City (optional)</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Random Cafe Button */}
                <button
                    onClick={getRandomCafe}
                    className="w-60 mb-5 bg-mint py-2 px-4 rounded-full shadow-md"
                    disabled={cafes.length === 0 || noCafesFound}
                >
                    Get Random Cafe
                </button>

                {/* No Cafes Found Message */}
                {noCafesFound && (
                    <p className="text-red-500">No cafes found matching your criteria.</p>
                )}

                {/* Display Random Cafe */}
                {randomCafe && (
                    <Link to={`/cafes/${randomCafe.urlSlug}`}>
                        <div className="h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl">
                            <img
                                src={randomCafe.image}
                                alt={randomCafe.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                            {randomCafe.location.city}
                        </p>
                        <p className="font-bold uppercase bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                            {randomCafe.location.country}
                        </p>
                        <p className="font-bold">{randomCafe.title}</p>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default RandomCafe;
