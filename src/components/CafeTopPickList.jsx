import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import CafeFilter from "./FilterCafe"

// Helmet library for individual SEO title + description
//import { Helmet } from "react-helmet"
import { Helmet, HelmetProvider } from "react-helmet-async"


function CafeSpecList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [cafeTopPick, setcafeTopPick] = useState([]);
  const { toppick } = useParams();
  const topPickToFilter = toppick;

  const getCafes = () => {
    const topPick = topPickToFilter.replace(/-([a-z])/g, (match, group) => group.toUpperCase());
    axios.get(`${API_URL}/cafes/for/${topPick}`)
      .then((response) => {
        setcafeTopPick(response.data);
        setFilteredCafes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCafes();
  }, [topPickToFilter]);

  // Capitalize the first letter of each word and keep spaces - For Headline in Frontend
  const formatTopPicks = (toppick) => {
    return toppick.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // Update the list based on the filter
  const handleFilter = (filteredCafes) => {
    setFilteredCafes(filteredCafes)
  }

  return (
    <>
      <Helmet>
        <title>{`${filteredCafes.length} Best Cafes for ${formatTopPicks(toppick)} | Sweet Spots`}</title>
        <meta name="description" content={`${formatTopPicks(toppick)} is your purpose. Discover my ${filteredCafes.length} favorite cafes worldwide and find your sweet spot.`} />
      </Helmet>
      <div>
        {toppick && (
          <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
            {formatTopPicks(toppick)} <br /> is your intention.
          </h1>
        )}
        <p className="text-1xl pt-10 px-10 flex justify-center text-center ">
          We exactly know what you are looking for. Explore my {filteredCafes.length} top coffee shops for {formatTopPicks(toppick)}.
        </p>
        {/*
        <div className="mb-10">
          <CafeFilter
            onFilter={handleFilter}
            cafes={cafeTopPick} // Pass the cafes data to the filter component
          />
        </div>
        */}
        <div className="pt-0 pb-7 px-7 flex flex-wrap justify-center mb-20 mt-10">
          {filteredCafes.length === 0 ? (
            <p>Cafes loading...</p>
          ) : (
            filteredCafes.map((cafe) => (
              <div
                key={cafe._id}
                className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5"
              >
                <Link to={`/cafes/${cafe.urlSlug}`}>
                  <div className="h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl">
                    <img
                      src={cafe.image}
                      alt={cafe.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                    {cafe.location.city}
                  </p>
                  <p className="font-bold uppercase bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                    {cafe.location.country}
                  </p>
                  <p className="font-bold">{cafe.title}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default CafeSpecList