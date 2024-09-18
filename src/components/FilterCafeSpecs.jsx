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
        const value = event.target.value;
        const newSelectedSpecs = event.target.checked
          ? [...selectedSpecs, value]
          : selectedSpecs.filter((spec) => spec !== value);
      
        setSelectedSpecs(newSelectedSpecs);
        onFilter(newSelectedSpecs); // Pass the new selected specs to the handleFilter function
      };

    return (
        <div className="w-full flex flex-col bg-beige px-20 py-10 h-auto">
          <h2 className="text-black uppercase text-center text-xl m-1 px-0.5 py-0.5 font-extrabold italic">
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
