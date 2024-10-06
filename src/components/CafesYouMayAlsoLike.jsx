import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <h2 className="pt-20 text-4xl mb-4 font-extrabold uppercase text-center">
      You May Also Like
      </h2>
      <Carousel responsive={responsive}>
      <div className="pt-0 px-7 flex flex-wrap justify-center mt-10 pb-10">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <div
              key={suggestion._id}
              className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5"
            >
            <Link to={`/cafes/${suggestion.urlSlug}`}
              className="h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl"              >
              <div>
                <img
                  src={suggestion.image}
                  alt={suggestion.title}
                  className="h-full w-full object-cover border-solid rounded-2xl"
                />
              </div>
              <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                {suggestion.location.city}
              </p>
              <p className="font-bold uppercase bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                {suggestion.location.country}
              </p>
              <p className="font-bold">{suggestion.title}</p>
            </Link>
            </div>
          ))
        ) : (
          <p>No suggestions available.</p>
        )}
        </div>
      </Carousel>
      </>
  );
};

export default YouMayAlsoLike;