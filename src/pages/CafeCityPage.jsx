import React, { useState, useEffect } from "react"
import axios from "axios"
import CafeCityList from "../components/CafeCityList"
import TopPickSection from "../components/SectionTopPick"

function CafeCityPage() {
    const API_URL = import.meta.env.VITE_API_URL
    const [topPick, setTopPick] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/topPick`)
            .then((response) => setTopPick(response.data))
            .catch((error) => console.error("Error fetching topPick:", error));
    }, [API_URL])

    return (
        <>
            <CafeCityList />
            <div className="bg-beige">
                <TopPickSection topPick={topPick} />
            </div>
        </>
    )
}

export default CafeCityPage