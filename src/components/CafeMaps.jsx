import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import axios from 'axios'
import { useParams } from 'react-router-dom'
 
const API_URL = import.meta.env.VITE_API_URL
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const containerStyle = {
  width: '100%',
  height: '100vh'
}

const CafeMaps = () => {
  const { urlSlug } = useParams()
  const [cafe, setCafe] = useState({})
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const getCafe = () => {
      axios
        .get(`${API_URL}/cafes/${urlSlug}`)
        .then((response) => {
          setCafe(response.data)
        })
        .catch((err) => {
          setErrorMessage(err.response?.data?.message || 'Error fetching cafe data')
        })
    }

    getCafe()
  }, [urlSlug])

  // lat & lng is stored as a String in database > converting to number
  const latitude = parseFloat(cafe.location?.[0]?.lat || 0)
  const longitude = parseFloat(cafe.location?.[0]?.lng || 0)

  console.log("Converted latitude:", latitude)
  console.log("Converted longitude:", longitude)

  return (
    <div className="pt-16">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={14}
        >
          {latitude && longitude && (
            <Marker
              position={{ lat: latitude, lng: longitude }}
              title="Cafe Location"
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default CafeMaps
