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

                if (fetchedCafes.length === 0) {
                    setNoCafesFound(true);
                } else {
                    setNoCafesFound(false);
                }

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
        <div className="bg-grey min-h-screen flex flex-col justify-center items-center pb-20">
        <h1 className="text-5xl text-white p-10 flex justify-center uppercase text-center font-extrabold" style={{ textShadow: "0px 0px 20px rgba(0,0,0,0.5)" }}>
            Tame the Monster
        </h1>
        
        <div className="flex flex-col md:flex-row w-full">
            {/* Left Column */}
            <div className="flex-1 flex flex-col items-center justify-center p-5">
                <p className="text-sm italic pb-10 px-10 text-center">
                    People aren't that jummy.<br />
                    Get some drinks & food in your tummy.
                </p>
    
                <div className="mb-5 flex justify-center w-full">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isHungry}
                            onChange={handleHungryChange}
                            className="mr-2"
                        />
                        I'm starving. Get me food!
                    </label>
                </div>
    
                <div className="mb-5 w-full flex justify-center">
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
    
                <div className="w-full flex justify-center">
                    <button
                        onClick={getRandomCafe}
                        className="w-60 mb-5 bg-mint py-2 px-4 rounded-full shadow-md"
                        disabled={cafes.length === 0 || noCafesFound}
                    >
                        Get Random Cafe
                    </button>
                </div>
    
                {noCafesFound && (
                    <p className="text-red-500 text-center md:text-left">Looks like I don't have a cafe matching your criteria. Change the settings!</p>
                )}
            </div>
    
            {/* Right Column */}
            <div className="flex-1 mt-10 md:mt-0 flex justify-center">
                {randomCafe && (
                    <Link to={`/cafes/${randomCafe.urlSlug}`}>
                        <div className="md:h-48 sm:h-80 w-64 max-w-full overflow-hidden border-solid rounded-2xl">
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
    </div>
    
    );
}

export default RandomCafe;
