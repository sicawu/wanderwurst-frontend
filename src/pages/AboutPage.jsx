import React from 'react';
import { FaMapMarkerAlt, FaRocket, FaUsers, FaLightbulb } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="font-sans">

      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <img
          src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
          alt="Exploring Sweet Spots"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl text-white font-extrabold italic uppercase mb-4">
            The <span className="text-teal-400">Story</span> Behind
          </h1>
          <p className="text-lg sm:text-2xl text-white max-w-3xl">
            From feeling lost, to find places and people that you belong to.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="relative py-16 bg-gray-50 flex flex-col md:flex-row items-center max-w-6xl mx-auto px-4 sm:px-6">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold italic mb-4 text-gray-900">
            Introducing Sweet Spots - A Heart Project
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Sweet Spots is a carefully curated collection of places that are special to me — places that inspired me, offered me a living room while I had none, and marked the beginning of beautiful connections. Do you know that feeling that everything just feels right? That you are at the right place, at the right time, with the right people. That's what it's all about.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Join my journey — I'd like to invite you to my little (travel) life.
          </p>
        </div>

        <div className="md:w-1/2">
          <img
            src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
            alt="Simona traveling"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
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
            <div className="bg-white/85 rounded-2xl p-6 shadow-md">
              <FaLightbulb className="text-teal-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-extrabold italic mb-2">The Idea</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                There's millions of cafes out there - which can be overwhelming. So where do we start? Sweet Spots is my personal selection of places that stood out to me for a specific reason.
              </p>
            </div>

            <div className="bg-white/85 rounded-2xl p-6 shadow-md">
              <FaUsers className="text-teal-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-extrabold italic mb-2">The Mission</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Finding places that truly fulfill a specific need and keep us coming back — spots where you feel belonging anywhere in the world.
              </p>
            </div>

            <div className="bg-white/85 rounded-2xl p-6 shadow-md">
              <FaRocket className="text-teal-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-extrabold italic mb-2">The Vision</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                One day, becoming an interactive platform for discovering sweet spots with trusted recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Gallery */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold italic text-center mb-12">
          A little glimpse into my journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full h-64 rounded-2xl shadow-lg overflow-hidden">
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
