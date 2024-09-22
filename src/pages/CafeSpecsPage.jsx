import CafeSpecsList from "../components/CafeSpecsList"
import React, { useState, useEffect } from "react"
import TopPickSection from "../components/SectionTopPick"
import axios from "axios"

function FilterBySpecsPage() {
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
            <CafeSpecsList />
            <TopPickSection topPick={topPick} />
        </>
    )
}

export default FilterBySpecsPage