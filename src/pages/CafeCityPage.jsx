import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CafeCityList from "../components/CafeCityList";
import TopPickSection from "../components/SectionTopPick";

function CafeCityPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [topPick, setTopPick] = useState([]);
    const [cities, setCities] = useState([]);

    // Fetch Top Pick data
    useEffect(() => {
        axios
            .get(`${API_URL}/topPick`)
            .then((response) => setTopPick(response.data))
            .catch((error) => console.error("Error fetching topPick:", error));
    }, [API_URL]);

    // Fetch Cities data
    useEffect(() => {
        axios
            .get(`${API_URL}/cities`)
            .then((response) => setCities(response.data))
            .catch((error) => console.error("Error fetching cities:", error));
    }, [API_URL]);

    return (
        <>
            <CafeCityList />

            {/* Cities Section */}
            <div className="min-h-[50vh] bg-cream w-full flex flex-col justify-center py-20 gap-5">
                <h2 className="pb-10 text-4xl font-extrabold uppercase text-center">
                    Broaden Your Horizon.
                </h2>
                <div className="flex flex-wrap justify-center px-10 gap-4">
                    {cities.map((city) => (
                        <Link
                            key={city}
                            to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                            className="bg-gold text-white border-1 border-black hover:bg-black font-semibold py-1 px-5 rounded-full shadow-md text-center">
                            {city}
                        </Link>
                    ))}
                </div>
            </div>
            {/* Toppick Section */}
            <div className="bg-beige">
                <TopPickSection topPick={topPick} />
            </div>
        </>
    );
}

export default CafeCityPage;
