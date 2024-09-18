import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import "../App.css"
import TopPickSection from "../components/SectionTopPick"
import FoodSection from "../components/SectionFood"
import DrinksSection from "../components/SectionDrinks"
import SpecsSection from "../components/SectionSpecs"

function Homepage() {
  const API_URL = import.meta.env.VITE_API_URL
  const [cities, setCities] = useState([])
  const [specs, setSpecs] = useState([])
  const [food, setFood] = useState([])
  const [drinks, setDrinks] = useState([])
  const [topPick, setTopPick] = useState([])

  useEffect(() => {
    // Fetch the list of cities from the API
    axios.get(`${API_URL}/cities`)
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Error fetching cities:", error))

    // Fetch the list of specs from the API
    axios.get(`${API_URL}/specs`)
      .then((response) => setSpecs(response.data))
      .catch((error) => console.error("Error fetching specs:", error))

    // Fetch the list of food options from the API
    axios.get(`${API_URL}/food`)
      .then((response) => setFood(response.data))
      .catch((error) => console.error("Error fetching food:", error))

    // Fetch the list of drink options from the API
    axios.get(`${API_URL}/drinks`)
      .then((response) => setDrinks(response.data))
      .catch((error) => console.error("Error fetching drinks:", error))

    // Fetch the list of topPick from the API
    axios.get(`${API_URL}/topPick`)
      .then((response) => setTopPick(response.data))
      .catch((error) => console.error("Error fetching topPick:", error))
  }, [API_URL]);


  // Connect value in the database with icon
  const iconMap = {
    working: "../icons/Working.png",
    bestCoffee: "../icons/Best-Coffee.png",
    socializing: "../icons/Socializing.png",
    girliesBrunch: "../icons/Girlies-Brunch.png",
    localPlace: "../icons/Local-Place.png",
    sustainable: "../icons/Sustainable.png"
  }

  const iconDescriptions = {
    working: {
      h3: "Working",
      p: "Find a cafe with ideal conditions to get some work done."
    },
    bestCoffee: {
      h3: "Best Coffee",
      p: "Coffee is key. Find the best coffee roasters and baristas in town."
    },
    socializing: {
      h3: "Socializing",
      p: "Popular social spots in town. Connect with friends & community!"
    },
    girliesBrunch: {
      h3: "Girlies Brunch",
      p: "Beautiful interior & amazing food. Treat yourselves special."
    },
    localPlace: {
      h3: "Local Place",
      p: "Local's first choice and hidden gems. Explore local cafes!"
    },
    sustainable: {
      h3: "Sustainability",
      p: "Find eco-friendly cafes that pay attention to the environment."
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/djkv0io5j/image/upload/v1726389353/Sweet%20Spots/Namto_House_Da_Nang_mxsdbz.jpg)' }}
      >
        <h1 className="text-5xl text-white p-10 flex justify-center uppercase text-center font-extrabold" style={{ textShadow: "0px 0px 10px black" }}>Sweet Spots</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pb-10 text-white p-10 font-extrabold">
          {cities.map((city) => (
            <Link to={`/best-cafes/${city.toLowerCase()}`} key={city}
              className="bg-black text-white border border-mint hover:bg-white hover:text-black py-2 px-6 rounded-full shadow-md text-center"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>

      <TopPickSection topPick={topPick} iconMap={iconMap} iconDescriptions={iconDescriptions} />
      <FoodSection food={food} />
      <DrinksSection drinks={drinks} />
      <SpecsSection specs={specs} />
    </>
  )
}

export default Homepage
