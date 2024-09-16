import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Homepage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [cities, setCities] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [food, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [topPick, setTopPick] = useState([]);

  useEffect(() => {
    // Fetch the list of cities from the API
    axios.get(`${API_URL}/cities`)
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });

    // Fetch the list of specs from the API
    axios.get(`${API_URL}/specs`)
      .then((response) => {
        setSpecs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specs:", error);
      });

    // Fetch the list of food options from the API
    axios.get(`${API_URL}/food`)
      .then((response) => {
        setFood(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specs:", error);
      });

    // Fetch the list of food options from the API
    axios.get(`${API_URL}/drinks`)
      .then((response) => {
        setDrinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specs:", error);
      });

    // Fetch the list of topPick from the API
    axios.get(`${API_URL}/topPick`)
      .then((response) => {
        setTopPick(response.data);
      })
      .catch((error) => {
        console.error("Error fetching topPick:", error);
      });
  }, [API_URL]);

  const iconMap = {
    working: "../icons/Working.png",
    bestCoffee: "../icons/Best-Coffee.png",
    socializing: "../icons/Socializing.png",
    girliesBrunch: "../icons/Girlies-Brunch.png",
    localPlace: "../icons/Local-Place.png",
    sustainable: "../icons/Sustainable.png"
  };

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
      p: "Find eco-friendly cafes that pay attention to environment."
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/djkv0io5j/image/upload/v1726389353/Sweet%20Spots/Namto_House_Da_Nang_mxsdbz.jpg)' }}
      >
        <h1 className="text-5xl text-white p-10 flex justify-center uppercase text-center font-extrabold" style={{ textShadow: "0px 0px 20px rgba(0,0,0,0.5)" }}>
          Find your sweet spot
        </h1>

        {/* Choose a City Section */}
        <div className="w-full max-w-lg mb-16 bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }}>
          <h2 className="text-xl text-white mb-4" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }}>Choose a city</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city) => (
              <Link
                key={city}
                to={`/best-cafes/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-mint text-white border-1 border-black hover:bg-gray-200 text-gray font-semibold py-2 px-6 rounded-full shadow-md text-center"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ICONS FOR TOP PICKS */}
      <div className="min-h-screen w-full flex flex-col justify-center my-10 gap-5">
        <h2 className="pb-10 text-4xl font-extrabold uppercase text-center">Know your purpose.</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {topPick.map((topPick, index) => {
            const iconUrl = iconMap[topPick]
            const linkText = topPick.replace(/([A-Z])/g, '-$1').toLowerCase() // convert camelCase to kebab-case
            const { h3, p } = iconDescriptions[topPick]; // Get the h3 and p text for each icon
            return (
              <div className="flex flex-col items-center mb-5 lg:w-1/4 w-1/3"
                key={index}>
                <Link
                  to={`/best-cafes/for/${linkText}`}
                  className="w-12 h-12" >

                  <img key={index}
                    src={iconUrl}
                    alt={topPick}
                    className="w-full h-full border-2 rounded-full object-cover object-center" />
                </Link>
                <Link
                  to={`/best-cafes/for/${linkText}`} >
                  <h3 className="text-s pt-3 flex justify-center text-center font-extrabold">{h3}</h3>
                  <p>{p}</p>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

       {/* Drinks Section */}
       <div className="min-h-screen w-full bg-black flex flex-col justify-center items-center py-16 px-4">
        <h2 className="pb-10 text-4xl text-white mb-4 font-extrabold uppercase text-center">Find your Fuel.</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {drinks.map((drinks) => (
            <Link
              key={drinks}
              to={`/best-cafes/drinks/${drinks.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-green text-white border-1 border-black hover:bg-mint font-semibold py-1 px-5 rounded-full shadow-md text-center"
            >
              {drinks}
            </Link>
          ))}
        </div>
      </div>

      {/* Food Section */}
      <div className="min-h-screen w-full bg-black flex flex-col justify-center items-center py-16 px-4">
        <h2 className="pb-10 text-4xl text-white mb-4 font-extrabold uppercase text-center">Feed the Monster.</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {food.map((food) => (
            <Link
              key={food}
              to={`/best-cafes/food/${food.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-green text-white border-1 border-black hover:bg-mint font-semibold py-1 px-5 rounded-full shadow-md text-center"
            >
              {food}
            </Link>
          ))}
        </div>
      </div>

      {/* Specs Section */}
      <div className="min-h-screen w-full bg-green flex flex-col justify-center items-center py-16 px-4">
        <h2 className="pb-10 text-4xl text-white mb-4 font-extrabold uppercase text-center">Set priorities.</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {specs.map((spec) => (
            <Link
              key={spec}
              to={`/best-cafes/${spec.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-mint text-white border-1 border-black hover:bg-black font-semibold py-1 px-5 rounded-full shadow-md text-center"
            >
              {spec}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Homepage