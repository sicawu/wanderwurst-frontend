import CafeList from "../components/CafeAllList"
import React, { useState, useEffect } from "react"
import TopPickSection from "../components/SectionTopPick"
import axios from "axios"

function BestCafesPage() {
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
      <CafeList />
      <div className="bg-beige">
        <TopPickSection topPick={topPick} />
      </div>
    </>
  )
}

export default BestCafesPage