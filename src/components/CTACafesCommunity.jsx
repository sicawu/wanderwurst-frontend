import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRocket, FaUsers } from 'react-icons/fa';


function CTACafesCommunity() {
    return (
        <div className="py-16 px-4 sm:px-6 bg-black text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase italic mb-6 flex items-center justify-center gap-2">
                <FaRocket className="text-teal" /> Ready to Find Your Sweet Spot?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-light">
                Explore curated cafes, share your discoveries, and join the community. Let's make travel sweeter together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                    to="/best-cafes"
                    className="bg-teal hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    aria-label="Explore cafes"
                >
                    <FaMapMarkerAlt /> Explore Cafes
                </Link>
                <Link
                    to="/login"
                    className="bg-transparent border-2 border-teal text-teal hover:bg-teal hover:text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    aria-label="Contact Simona"
                >
                    <FaUsers /> Become a Sweet Spotter
                </Link>
            </div>
        </div>
    );
}

export default CTACafesCommunity;