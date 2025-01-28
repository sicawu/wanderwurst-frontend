import React from 'react';
import { Link } from 'react-router-dom';

function TheStoryBehind() {
    return (
        <section className="bg-gray-100 py-16 px-6 flex flex-col md:flex-row items-center justify-between">
            {/* Image Section */}
            <div className="md:w-1/2 mb-6 md:mb-0">
                <img
                    src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
                    alt="The Story Behind"
                    className="rounded-lg shadow-lg w-full h-auto transform transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 md:pl-10">
                <h2 className="text-4xl font-extrabold uppercase text-center">
                    A Travel Blog.
                </h2>
                <h3 className="pb-4 text-2xl font-extrabold uppercase text-center ">
                    Slightly Different.
                </h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                    A sweet spot is that magical place where everything feels just right. Where intention and conditions meets reality. Where you get and become the best version. And that’s exactly what I seek while exploring the world. Hi, I’m Simona, the slow traveler behind this. :)
                    <br /><br />
                    On Sweet Spots, I’m excited to share places that hold many beautiful memories of mine. These are cafes that became my living room when I had none, hidden corners of the world that inspired, grounded, and filled my days with connections and laughs. Or simply offered space to hide.
                    <br /><br />
                    This is more than just a list of destinations; it’s personal. I’ve poured my heart, full stack skills, and creative twist into this. So, follow my journey and explore my favorite sweet spots worldwide.
                </p>
                <div className="flex justify-center">
                    <Link
                        to="/about"
                        className="bg-gold text-white border-1 border-black hover:bg-black font-semibold py-1 px-5 rounded-full shadow-md text-center"
                    >
                        More about the (Hi)Story
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default TheStoryBehind;
