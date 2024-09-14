/// Filter function for cities

import React, { useState, useEffect } from "react"
import axios from "axios"

function CafeFilter({ onFilter }) {
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState("") // To replace "Select a city" and display the chosen city name instead
    const API_URL = import.meta.env.VITE_API_URL

    // Get city names from database
    useEffect(() => {
        axios.get(`${API_URL}/cities`)
            .then((response) => setCities(response.data))
            .catch((error) => console.error("Error fetching cities:", error));
    }, [])

    const handleCityChange = (event) => {
        const city = event.target.value
        setSelectedCity(city)

        if (city === "") {
            // If "Select a City" is chosen, fetch all cafes
            axios.get(`${API_URL}/cafes`)
                .then((response) => onFilter(response.data))
                .catch((error) => {
                    console.error("Error fetching all cafes:", error)
                    onFilter([]); // Reset cafes if an error occurs
                })
        } else {
            // Get all cafes for the selected city
            const formattedCity = city.toLowerCase().replace(/\s+/g, '-')
            axios.get(`${API_URL}/cafes/city/${formattedCity}`)
                .then((response) => onFilter(response.data)) // Pass the data to the callback
                .catch((error) => {
                    console.error("Error fetching cafes:", error)
                    onFilter(city); // Reset cafes if an error occurs
                })
        }
    }

    return (
        <div className="w-60 flex rounded-full shadow-md max-w-md mx-auto mt-8 h-10">
            <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
                className="py-2 px-4 rounded-full flex-grow focus:outline-none"
            >
                <option value="" className="text-gray-700">Select a City</option>
                {cities.map((city, index) => (
                    <option key={index} value={city} className="text-gray-700">
                        {city}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CafeFilter