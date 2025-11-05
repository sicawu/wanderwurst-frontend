import React from 'react';
import { FaMapMarkerAlt, FaRocket, FaUsers, FaLightbulb } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="font-sans">

      {/* Hero Section with full-width image */}
      <section className="relative h-screen w-full">
        <img
          src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
          alt="Exploring Sweet Spots"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl text-white font-extrabold italic uppercase mb-4">
            The <span className="text-teal-400">Story</span> Behind
          </h1>
          <p className="text-lg sm:text-2xl text-white max-w-3xl">
            From feeling lost, to find places and people that you belong to.
          </p>
        </div>
      </section>

      {/* Introduction Section with side image */}
      <section className="relative py-16 bg-gray-50 flex flex-col md:flex-row items-center max-w-6xl mx-auto px-4 sm:px-6">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold italic mb-4 text-gray-900">
            Introducing Sweet Spots - A Heart Project
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Sweet Spots is a carefully curated collection of places that are special to me—places that inspired me, make me feel comfortable and happy, and felt like home while being away from home.I love to travel; slow traveling helps me find spots that make me feel grounded, happy, and safe. These "sweet spots" are my sanctuaries: spaces that inspire and energize me.
          </p>
           <p className="text-lg sm:text-2xl text-white max-w-3xl">
            Discover the magic of places that inspire you, make you feel at home, and energize your travels. Sweet Spots are more than destinations—they're experiences.
          </p>
        </div>
        <div className="md:w-1/2 relative">
          <img
            src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
            alt="Simona traveling"
            className="rounded-2xl shadow-lg w-full object-cover transform rotate-[-2deg]"
          />
        </div>
      </section>

      {/* Idea / Mission / Vision Section with background image */}
      <section className="relative py-24">
        <img
          src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
          alt="Background Sweet Spots"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold italic uppercase mb-12 text-gray-900">
            The Reason Why
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Idea */}
            <div className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-md">
              <FaLightbulb className="text-teal-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-extrabold italic mb-2">The Idea</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
There's millions of cafes out there. Sharing my favorite spaces              </p>
            </div>

            {/* Mission */}
            <div className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-md">
              <FaUsers className="text-teal-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-extrabold italic mb-2">The Mission</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Sweet Spots is about finding places that truly fulfill needs and keep us coming back—spots where you feel a sense of belonging anywhere in the world.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-md">
              <FaRocket className="text-teal-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-extrabold italic mb-2">The Vision</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                To become an interactive platform for discovering sweet spots in new cities, with trusted recommendations and inspiration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrapbook Gallery - bigger, overlapping photos */}
      <section className="py-24 relative max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold italic text-center mb-12">
          Sweet Spots in Action
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={`w-80 h-64 overflow-hidden rounded-2xl shadow-lg transform rotate-[${index % 2 === 0 ? '-3deg' : '3deg'}]`}>
              <img
                src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
                alt={`Sweet Spot ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default AboutPage;
