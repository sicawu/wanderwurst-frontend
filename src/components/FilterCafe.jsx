// Filter by city + food

import axios from "axios";
import React, { useState, useEffect } from "react";

function CafeFilter({ onCityFilter, onDrinkFilter, onFoodFilter }) {
    const [cities, setCities] = useState([]);
    const [foods, setFoods] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedFood, setSelectedFood] = useState("");
    const [selectedDrink, setSelectedDrink] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    // Get city names and food options from the database
    useEffect(() => {
        // Fetch cities
        axios.get(`${API_URL}/cities`)
            .then((response) => setCities(response.data))
            .catch((error) => console.error("Error fetching cities:", error));

        // Fetch drinks options
        axios.get(`${API_URL}/drinks`)
            .then((response) => setDrinks(response.data))
            .catch((error) => console.error("Error fetching drinks:", error));

        // Fetch food options
        axios.get(`${API_URL}/food`)
            .then((response) => setFoods(response.data))
            .catch((error) => console.error("Error fetching foods:", error));
    }, [API_URL]);


    // Handle city selection
    const handleCityChange = (event) => {
        const city = event.target.value;
        setSelectedCity(city);
        onCityFilter(city); // Call the city filter callback
    }

    // Handle drinks selection
    const handleDrinkChange = (event) => {
        const drink = event.target.value;
        setSelectedDrink(drink);
        onDrinkFilter(drink); // Call the food filter callback
    }

    // Handle food selection
    const handleFoodChange = (event) => {
        const food = event.target.value;
        setSelectedFood(food);
        onFoodFilter(food); // Call the food filter callback
    }

    return (
        <div className="w-full flex flex-col justify-center items-center space-y-5 mx-auto mt-5">
            {/* City Filter Dropdown */}
            <div className="w-60 rounded-full shadow-md">
                <select
                    id="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"
                >
                    <option value="">Select a City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            {/* Drinks Filter Dropdown */}
            <div className="w-60 rounded-full shadow-md">
                <select
                    id="drink"
                    value={selectedDrink}
                    onChange={handleDrinkChange}
                    className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"
                >
                    <option value="">Select a Drink</option>
                    {drinks.map((drink, index) => (
                        <option key={index} value={drink}>
                            {drink}
                        </option>
                    ))}
                </select>
            </div>

            {/* Food Filter Dropdown */}
            <div className="w-60 rounded-full shadow-md">
                <select
                    id="food"
                    value={selectedFood}
                    onChange={handleFoodChange}
                    className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"
                >
                    <option value="">Select Food</option>
                    {foods.map((food, index) => (
                        <option key={index} value={food}>
                            {food}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default CafeFilter;
