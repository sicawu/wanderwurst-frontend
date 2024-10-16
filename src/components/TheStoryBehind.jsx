import React from 'react';
import { Link } from 'react-router-dom';

function TheStoryBehind() {
    return (
        <section className="bg-gray-100 py-16 px-4 flex flex-col md:flex-row items-center justify-between">
            {/* Image Section */}
            <div className="md:w-1/2 mb-6 md:mb-0">
                <img
                    src="https://res.cloudinary.com/djkv0io5j/image/upload/v1727849638/Sweet%20Spots/simona-wurst-sweet-spots_tb2i1l.jpg"
                    alt="The Story Behind"
                    className="rounded-lg shadow-lg w-full h-auto"
                />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 md:pl-10">
                <h2 className="pb-10 text-4xl mb-4 font-extrabold uppercase text-center">A travel blog. Slightly different.</h2>
                <p className="mb-6 text-gray-700">
                    A sweet spot is that magical place where everything feels just right. Where intention meets reality. Where you get and become the best version. And that’s exactly what I seek while exploring the world. Hi, I’m Simona, the slow traveler behind this. :) <br />
                    <br />
                    On Sweet Spots, I’m excited to share places that hold many beautiful memories of mine. These are cafes that became my living room when I had none, hidden corners of the world that inspired, grounded, and filled my days with connections and laughs. Or simply offered space to hide.<br />
                    <br />
                    This is more than just a list of destinations; it’s personal. I’ve poured my heart, full stack skills and creative twist into this. So, follow my journey and explore my favorite sweet spots worldwide.
                </p>
                <Link to="/about" className="inline-flex items-center justify-center px-4 py-3 font-semibold text-white bg-gold hover:bg-black rounded-lg transition-colors ease-out duration-200">
                    More about the (Hi)story
                </Link>
            </div>
        </section>
    );
}

export default TheStoryBehind;
