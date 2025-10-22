import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRocket, FaUsers, FaLightbulb } from 'react-icons/fa'; // Added icons for visual interest
import CTACafesCommunity from "../components/CTACafesCommunity"


function AboutPage() {
    return (
        <div>
            {/* Main Heading */}
            <h1 className="bg-black text-white uppercase text-center text-3xl py-2 mb-10 font-extrabold italic">
                The <span className="text-teal">Story</span> Behind
            </h1>
            {/* Introduction Section */}
            <div className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase italic text-gray-900 mb-6 flex items-center justify-center gap-2">
                        Introducing Sweet Spots - A Heart Project
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8 font-normal">
                        A travel blog, slightly different. Sweet Spots is a carefully curated collection of places that are special to me—places that inspired me, make me feel comfortable and happy, and felt like home while being away from home.
                    </p>
                    <img
                        src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
                        alt="Simona traveling - capturing the essence of Sweet Spots"
                        className="rounded-2xl shadow-xl w-full h-auto transform transition-transform duration-500 hover:scale-105 mx-auto"
                    />
                </div>
            </div>

            {/* The Idea Section */}
            <div className="py-16 px-4 sm:px-6 bg-gradient-to-r from-teal-50 to-mint-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase italic text-gray-900 mb-6 flex items-center justify-center gap-2">
                        <FaLightbulb className="text-teal" /> The Idea of Sweet Spots
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed font-normal">
                        I love to travel; it’s a huge part of my life. When people start asking "on which continent are you" instead of "How are you," you know it’s real. I prefer slow traveling—finding places that make you feel grounded, happy, and safe while being far from home. These places, which I call "sweet spots," are my sanctuaries: spaces that inspire and energize me.
                    </p>
                    {/* Added Image Placeholder for Visual Interest */}
                    <img
                        src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
                        alt="Simona exploring a sweet spot"
                        className="rounded-2xl shadow-lg w-full h-auto mt-8 transform transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>

            {/* The Mission Section */}
            <div className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase italic text-gray-900 mb-6 flex items-center justify-center gap-2">
                        <FaUsers className="text-teal" /> The Mission
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed font-normal">
                        Sweet Spots is about finding places that truly fulfill specific needs and keep me coming back. These are wholesome spots around the world, carefully curated to offer more than just a place to visit—a place to belong.
                    </p>
                </div>
            </div>

            {/* The Vision Section */}
            <div className="py-16 px-4 sm:px-6 bg-gradient-to-r from-mint-50 to-teal-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase italic text-gray-900 mb-6 flex items-center justify-center gap-2">
                        <FaRocket className="text-teal" /> The Vision
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed font-normal">
                        The vision for Sweet Spots is to become an interactive platform that serves as your first choice for discovering sweet spots in new cities. A place you can turn to for trusted recommendations.
                    </p>
                </div>
            </div>
            <CTACafesCommunity />
        </div>
    );
}

export default AboutPage;