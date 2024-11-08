import React, { useState, useEffect } from "react"
import axios from "axios"
import CafeSpecsList from "../components/CafeSpecsList"
import TopPickSection from "../components/SectionTopPick"

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