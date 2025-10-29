import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRocket, FaUsers, FaLightbulb } from 'react-icons/fa'; // Added icons for visual interest


function AboutPage() {
    return (
        <div>
            {/* Main Heading */}
            <h1 className="bg-black text-white uppercase text-center text-3xl py-2 mb-10 font-extrabold italic">
                The <span className="text-teal">Story</span> Behind
            </h1>

              {/* Inspirational Intro */}
      <section className="py-16 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <p className="text-xl sm:text-2xl text-gray-700 font-light leading-relaxed mb-8">
          Discover the magic of places that inspire you, make you feel at home, and energize your travels. Sweet Spots are more than destinations—they're experiences.
        </p>
        <img
          src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
          alt="Exploring Sweet Spots"
          className="rounded-2xl shadow-lg w-full h-64 object-cover mx-auto transform transition-transform duration-500 hover:scale-105"
        />
      </section>


      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center transform transition-transform duration-500 hover:scale-105">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase italic text-gray-900 mb-6">
            Introducing Sweet Spots - A Heart Project
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            A travel blog, slightly different. Sweet Spots is a carefully curated collection of places that are special to me—places that inspired me, make me feel comfortable and happy, and felt like home while being away from home.             I love to travel; it’s a huge part of my life. When people start asking "on which continent are you" instead of "How are you," you know it’s real. I prefer slow traveling—finding places that make you feel grounded, happy, and safe while being far from home. These places, which I call "sweet spots," are my sanctuaries: spaces that inspire and energize me.

          </p>
          <img
            src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
            alt="Simona traveling - capturing the essence of Sweet Spots"
            className="rounded-2xl shadow-xl w-full h-auto mx-auto transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </section>

     {/* Idea / Mission / Vision Section */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold italic text-center uppercase mb-12">
The Reason Why        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Idea */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
            <FaLightbulb className="text-teal text-5xl mb-4" />
            <h3 className="text-xl font-extrabold uppercase italic mb-2">The Idea</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              I love to travel; it’s a huge part of my life. Sweet spots are spaces that inspire and energize me, making each journey meaningful.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
            <FaUsers className="text-teal text-5xl mb-4" />
            <h3 className="text-xl font-extrabold uppercase italic mb-2">The Mission</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Sweet Spots is about finding places that truly fulfill specific needs and keep us coming back. These are spots where you feel a sense of belonging anywhere in the world.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
            <FaRocket className="text-teal text-5xl mb-4" />
            <h3 className="text-xl font-extrabold uppercase italic mb-2">The Vision</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              To become an interactive platform that serves as your first choice for discovering sweet spots in new cities, with trusted recommendations and inspiration.
            </p>
          </div>

        </div>
      </section>

      {/* Uniform Gallery */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase italic text-gray-900 text-center mb-10">
          Sweet Spots in Action
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <img
              key={index}
              src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
              alt={`Sweet Spot ${index + 1}`}
              className="w-full h-48 object-cover rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105"
            />
          ))}
        </div>
      </section>

    </div>
  );
}

export default AboutPage;