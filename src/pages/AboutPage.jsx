import React from 'react';

function AboutPage() {
    return (
        <div>
            {/* Main Heading */}
            <h1 className="bg-black text-white uppercase text-center text-3xl py-2 mb-10 font-extrabold italic">
                The <span className="text-teal">Story</span> Behind
            </h1>

            {/* Introduction */}
            <div className="text-center mb-10">
                <h2 className="text-black uppercase text-xl mb-2 font-extrabold italic">
                    Introducing Sweet Spots - A Heart Project
                </h2>
                <p className="text-lg text-gray-700 px-6 md:px-20 lg:px-40 leading-relaxed">
                    A travel blog, slightly different. Sweet Spots is a carefully curated collection of places that are special to me—places that inspired me, make me feel comfortable and happy, and felt like home while being away from home.
                </p>
            </div>

                {/* Image Section */}
                <div className="flex justify-center m-10">
                <img
                    src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
                    alt="Simona traveling"
                    className="rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 transform transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* The Idea */}
            <div className="text-center mb-10">
                <h2 className="text-black uppercase text-xl mb-2 font-extrabold italic">
                    The Idea of Sweet Spots
                </h2>
                <p className="text-lg text-gray-700 px-6 md:px-20 lg:px-40 leading-relaxed">
                    I love to travel; it’s a huge part of my life. When people start asking "on which continent are you" instead of "How are you," you know it’s real. I prefer slow traveling—finding places that make you feel grounded, happy, and safe while being far from home. These places, which I call "sweet spots," are my sanctuaries: spaces that inspire and energize me.
                </p>
            </div>

            {/* The Mission */}
            <div className="text-center mb-10">
                <h2 className="text-black uppercase text-xl mb-2 font-extrabold italic">
                    The Mission
                </h2>
                <p className="text-lg text-gray-700 px-6 md:px-20 lg:px-40 leading-relaxed">
                    Sweet Spots is about finding places that truly fulfill specific needs and keep me coming back. These are wholesome spots around the world, carefully curated to offer more than just a place to visit—a place to belong.
                </p>
            </div>

            {/* The Vision */}
            <div className="text-center mb-10">
                <h2 className="text-black uppercase text-xl mb-2 font-extrabold italic">
                    The Vision
                </h2>
                <p className="text-lg text-gray-700 px-6 md:px-20 lg:px-40 leading-relaxed">
                    The vision for Sweet Spots is to become an interactive platform that serves as your first choice for discovering sweet spots in new cities. A place you can turn to for trusted recommendations.
                </p>
            </div>
        </div>
    );
}

export default AboutPage;
