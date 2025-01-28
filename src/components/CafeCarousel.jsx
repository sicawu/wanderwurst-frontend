import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import WishlistButton from '../components/WishlistButton';


function CafeCarousel({ urlSlugs }) {
  const [suggestions, setSuggestions] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Hardcoded cafe titles to fetch data for
  // const urlSlugs = ["tan-coffee-da-nang", "zest-ubud", "revolver-canggu", "namaskara-coffee-and-superfoods-ubud"];

  console.log({ urlSlugs });

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestionsData = await Promise.all(
          urlSlugs.map((urlSlug) => {
            return axios
              .get(`${API_URL}/cafes/${urlSlug}`);
          })
        );
        setSuggestions(suggestionsData.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [API_URL, urlSlugs]);

  return (
    <>
      <h2 className="pt-20 text-4xl mb-3 font-extrabold uppercase text-center">
        My Favorite Cafe Spots
      </h2>
      <div className="flex justify-center mb-12">
        <Link to="/best-cafes" className="flex items-center underline">
          <MdKeyboardDoubleArrowRight className="mr-1" />
          Discover All Cafes
        </Link>
      </div>

      {/* Horizontal scrolling container */}
      <div className="overflow-x-auto whitespace-nowrap flex space-x-4 px-5 pb-5 mb-20 justify-start lg:justify-center">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <div
              key={suggestion._id}
              className="inline-block w-64 h-full"
            >
              <div className="relative h-72 w-full max-w-full rounded-lg shadow-md">
                <Link to={`/cafes/${suggestion.urlSlug}`} className="h-full w-full block">
                  <img src={suggestion.image} alt={suggestion.title} className="h-full w-full object-cover rounded-lg" />
                </Link>
                <div className="absolute top-4 right-4">
                  <WishlistButton urlSlug={suggestion.urlSlug} />
                </div>
              </div>
              <Link to={`/cafes/${suggestion.urlSlug}`} className="block mt-4 text-center">

                <p className="font-bold uppercase bg-mint text-gray rounded-full mb-1 mr-1 px-2 py-1 inline-block">
                  {suggestion.location.city}
                </p>
                <p className="font-bold uppercase bg-teal text-white rounded-full mb-1 px-2 py-1 inline-block">
                  {suggestion.location.country}
                </p>
                <p className="font-bold">{suggestion.title}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="pb-10">
            My recommendations will be available soon, stay tuned. :)
          </p>
        )}
      </div>
    </>
  );
};

export default CafeCarousel;
