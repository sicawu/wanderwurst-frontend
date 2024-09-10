import React, { useState, useEffect } from "react"
import axios from "axios"

function CafeFilterSpecs({ onFilter }) {
    const [specs, setSpecs] = useState([])
    const [selectedSpecs, setSelectedSpecs] = useState([])

    const API_URL = import.meta.env.VITE_API_URL

    // Get specs from the database
    useEffect(() => {
        axios.get(`${API_URL}/specs`)
            .then((response) => setSpecs(response.data))
            .catch((error) => console.error("Error fetching specs:", error))
    }, [])

    const handleSpecSelection = (event) => {
        const value = event.target.value
        const newSelectedSpecs = event.target.checked
            ? [...selectedSpecs, value]
            : selectedSpecs.filter(spec => spec !== value)

        setSelectedSpecs(newSelectedSpecs)
        onFilter(newSelectedSpecs)
    }

    return (
        <div className="w-90 flex flex-col shadow-md max-w-md mx-auto mt-8 h-auto">
            <h2 className="text-s pt-5 pb-3 flex justify-center text-center font-extrabold">
                Set Priorities
            </h2>
            <div className="flex flex-wrap">
                {specs.map((spec, index) => (
                    <label key={index} className="flex flex-wrap items-center pr-5">
                        <input
                            type="checkbox"
                            value={spec}
                            onChange={handleSpecSelection}
                            className="mr-2"
                        />
                        {spec}
                    </label>
                ))}
            </div>

        </div>
    )
}

export default CafeFilterSpecs
