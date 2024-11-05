import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import WishlistButton from '../components/WishlistButton';


const YouMayAlsoLike = ({ cafeSuggestions }) => {
  const [suggestions, setSuggestions] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestionsData = await Promise.all(
        cafeSuggestions.map((suggestion) => {
          return axios.get(`${API_URL}/cafes/${suggestion}`);
        })
      );
      setSuggestions(suggestionsData.map((response) => response.data));
    };
    fetchSuggestions();
  }, [cafeSuggestions]);

  return (
    <>
      <h2 className="pt-20 text-4xl mb-3 font-extrabold uppercase text-center">
        You May Also Like
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
              <div className="relative h-72 w-full max-w-full rounded-2xl border-solid mb-4">
                <Link to={`/cafes/${suggestion.urlSlug}`} className="h-full w-full block">
                  <img src={suggestion.image} alt={suggestion.title} className="h-full w-full object-cover border-solid rounded-2xl" />
                </Link>
                <div className="absolute top-4 right-4 z-20">
                  <WishlistButton urlSlug={suggestion.urlSlug} />
                </div>
              </div>
              <Link to={`/cafes/${suggestion.urlSlug}`}>
                <p className="font-bold uppercase bg-mint text-gray-800 rounded-full mb-1 mr-1 px-2 py-1 inline-block">
                  {suggestion.location.city}
                </p>
                <p className="font-bold uppercase bg-teal text-white rounded-full mb-1 px-2 py-1 inline-block">
                  {suggestion.location.country}
                </p>
                <p className="font-bold text-gray-900">{suggestion.title}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="pb-10">
            Either, this is one of a kind. Or, I didn't have time yet and my recommendations will be available soon, stay tuned. :)
          </p>
        )}
      </div>
    </>
  );
};

export default YouMayAlsoLike;
