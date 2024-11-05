import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RandomCafe() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [isHungry, setIsHungry] = useState(false);
    const [cafes, setCafes] = useState([]);
    const [randomCafe, setRandomCafe] = useState(null);
    const [noCafesFound, setNoCafesFound] = useState(false);

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
            const randomIndex = Math.floor(Math.random() * cafes.length);
            setRandomCafe(cafes[randomIndex]);
        }
    };

    return (
        <div className="bg-gradient-to-b from-black to-gray-800 min-h-screen pb-20">
            <h1 className="text-5xl text-white p-10 flex justify-center uppercase text-center font-extrabold" style={{ textShadow: "0px 0px 20px rgba(0,0,0,0.5)" }}>
                Tame the Monster
            </h1>

            <div className="w-full px-4">
                <p className="text-sm text-white italic pb-10 text-center">
                    People aren't that jummy.<br />
                    Get some drinks & food in your tummy.
                </p>

                <div className="mb-5 flex justify-center">
                    <label className="text-white flex items-center">
                        <input
                            type="checkbox"
                            checked={isHungry}
                            onChange={handleHungryChange}
                            className="mr-2"
                        />
                        I'm starving. Get me food!
                    </label>
                </div>

                <div className="mb-5 flex justify-center">
                    <select
                        id="city"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="w-60 py-2 px-4 rounded-full shadow-lg bg-white text-black border border-gray-300"
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
                        className="w-60 mb-5 bg-teal hover:bg-teal-600 text-white py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out"
                        disabled={cafes.length === 0 || noCafesFound}
                    >
                        Get Random Cafe
                    </button>
                </div>

                {noCafesFound && (
                    <p className="text-red-400 text-center">Meow, looks like I don't have a cafe matching your criteria. Change the settings!</p>
                )}
            </div>

            <div className="mt-10 flex justify-center">
                {randomCafe && (
                    <Link to={`/cafes/${randomCafe.urlSlug}`} className="text-center">
                        <div className="h-72 w-full max-w-md overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
                            <img
                                src={randomCafe.image}
                                alt={randomCafe.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <p className="font-bold uppercase bg-mint text-gray-800 rounded-full mb-1 mr-1 px-2 py-1 inline-block">
                            {randomCafe.location.city}
                        </p>
                        <p className="font-bold uppercase bg-teal text-white rounded-full mb-1 px-2 py-1 inline-block">
                            {randomCafe.location.country}
                        </p>
                        <p className="text-white font-bold text-lg">{randomCafe.title}</p>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default RandomCafe;
