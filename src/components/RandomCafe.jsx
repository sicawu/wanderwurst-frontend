import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RandomCafe() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [cities, setCities] = useState([]); // Store the list of cities
    const [selectedCity, setSelectedCity] = useState("");
    const [cafes, setCafes] = useState([]);
    const [randomCafe, setRandomCafe] = useState(null);

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

    // Fetch cafes for the selected city
    useEffect(() => {
        if (selectedCity) {
            axios.get(`${API_URL}/cafes/city/${selectedCity}`)
                .then((response) => {
                    setCafes(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching cafes:", error);
                });
        }
    }, [selectedCity, API_URL]);

    // Handle city selection
    const handleCityChange = (event) => {
        const city = event.target.value;
        setSelectedCity(city);
    };

    // Get a random cafe
    const getRandomCafe = () => {
        if (cafes.length > 0) {
            const randomIndex = Math.floor(Math.random() * cafes.length);
            setRandomCafe(cafes[randomIndex]);
        }
    };

    return (
<div className="min-h-screen flex flex-col justify-center items-center">           
<h1 className="text-5xl text-white p-10 flex justify-center uppercase text-center font-extrabold" style={{ textShadow: "0px 0px 20px rgba(0,0,0,0.5)" }}>
        Tame the Monster
        </h1>
            <div className="flex flex-col items-center justify-center">
            <p className="text-1xl pb-10 px-10 flex justify-center text-center ">
                    Too lazy, hungry or tired to choose? We got you!
                </p>
            
                {/* City Selection */}
                <div className="mb-5">
                    <select
                        id="city"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="py-2 px-4 rounded-full shadow-md"
                    >
                        <option value="">Select a City</option>
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
                    className="mb-5 bg-mint-500 py-2 px-4 rounded-full shadow-md"
                    disabled={cafes.length === 0}
                >
                    Get Random Cafe
                </button>

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
