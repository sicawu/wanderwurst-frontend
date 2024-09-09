import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'

function CafeOpeningHours({ placeId }) {
  const API_URL = import.meta.env.VITE_API_URL
  const [openingHours, setOpeningHours] = useState([])
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchOpeningHours = async () => {
        if (!placeId) return; // Wait until placeId is available
  
        try {
          const response = await axios.get(`${API_URL}/cafe-opening-hours/${placeId}`)
          const hours = response.data || []
          setOpeningHours(hours)
          console.log(hours)
        } catch (error) {
          console.error("Error fetching opening hours:", error)
          setError("Could not fetch opening hours.")
        }
      }
  
      fetchOpeningHours();
    }, [placeId])

  return (
    <div>
      <h3 className="text-s pt-10 pb-3 flex justify-center text-center font-extrabold">
        Opening Hours
        </h3>
      {openingHours.length > 0 ? (
        <ul>
          {openingHours.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      ) : (
        <p>No opening hours available.</p>
      )}
    </div>
  );
}

export default CafeOpeningHours