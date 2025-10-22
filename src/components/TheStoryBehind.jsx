import React from 'react';
import { Link } from 'react-router-dom';

function TheStoryBehind() {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-gray-200 py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105">
                    <img
                        src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
                        alt="The Story Behind - Simona Wurst"
                        className="w-full h-auto object-cover"
                    />
                    {/* Optional Overlay for Depth */}
                    <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity duration-300"></div>
                </div>
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-gray-900 mb-2 animate-fade-in">
                    A Travel Blog.
                </h2>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-teal mb-6">
                    Slightly Different.
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
                    A sweet spot is that magical place where everything feels just right. Where intention and conditions meet reality. Where you get and become the best version. And that’s exactly what I seek while exploring the world. Hi, I’m Simona, the slow traveler behind this. :)
                    <br /><br />
                    On Sweet Spots, I’m excited to share places that hold many beautiful memories of mine. These are cafes that became my living room when I had none, hidden corners of the world that inspired, grounded, and filled my days with connections and laughs. Or simply offered space to hide.
                    <br /><br />
                    This is more than just a list of destinations; it’s personal. I’ve poured my heart, full stack skills, and creative twist into this. So, follow my journey and explore my favorite sweet spots worldwide.
                </p>
                <div className="flex justify-center md:justify-start">
                    <Link
                        to="/about"
                        className="bg-gradient-to-r from-gold to-yellow-500 text-white hover:from-black hover:to-gray-800 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
                        aria-label="Learn more about the story behind Sweet Spots"
                    >
                        More about the (Hi)Story
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default TheStoryBehind;