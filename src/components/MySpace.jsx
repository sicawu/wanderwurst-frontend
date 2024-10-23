import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

function MySpace({ profile, setProfile }) {
    const location = useLocation();
    const [filteredCafes, setFilteredCafes] = useState([]); // State to hold cafes from wishlist
    const navigate = useNavigate();

    useEffect(() => {
        // Check if profile is passed via state
        if (location.state && location.state.profile) {
            setProfile(location.state.profile);
        } else {
            // If no profile in state, try to get it from localStorage
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
                console.log(storedProfile)
                setProfile(JSON.parse(storedProfile));
            }
        }
    }, [location.state]);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (profile && profile.googleId || profile.id) { // I have no idea why this is working so my wishlist gets populated but it does. DONT TOUCH
                try {
                    const response = await axios.get(`${API_URL}/user/${profile.googleId || profile.id}`);
                    console.log(`Wishlist`, response.data.wishlist)
                    setFilteredCafes(response.data.wishlist); // Set the wishlist (which is populated with cafe details)
                } catch (error) {
                    console.error('Error fetching wishlist:', error);
                }
            } else {
                console.error('Profile or internal user ID is undefined');
            }
        };
    
        fetchWishlist();
    }, [profile, API_URL]);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('userProfile')
        localStorage.removeItem('isWished')
        setProfile(null)
        navigate('/')
    };

    return (
        <div className="min-h-screen pb-20">
            {profile ? (
                <div>
                    <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
                        Welcome to Your Space
                    </h1>
                    <div className="flex flex-col items-center justify-center">
                        <img
                            className="w-20 h-20 rounded-full object-cover my-10"
                            src={profile.picture} alt={profile.name}
                        />
                        <p>I'm happy to have you here, {profile.given_name || profile.name}.</p>
                        <p>Your Email: {profile.email}</p>
                        {/* Logout Button */}
                        <button
                        className="inline-flex items-center justify-center px-4 py-3 my-10 font-semibold text-white bg-coral hover:bg-black rounded-lg transition-colors ease-out duration-200"
                        onClick={handleLogout}>
                        Logout
                    </button>
                    </div>
                    {/* Display Wishlist Cafes */}
                    <h2 className="pt-20 text-4xl mb-3 font-extrabold uppercase text-center">
                        Your Wishlist
                    </h2>
                    <div className="flex justify-center mb-12">
                        <Link to="/best-cafes" className="flex items-center underline">
                            <MdKeyboardDoubleArrowRight className="mr-1" />
                            Discover More Cafes
                        </Link>
                    </div>
                    <div className="pt-0 px-7 flex flex-wrap justify-center mt-10 pb-10">
                        {filteredCafes.length > 0 ? (
                            filteredCafes.map((cafe) => (
                                <div
                                    key={cafe._id}
                                    className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5"
                                >
                                    <Link to={`/cafes/${cafe.urlSlug}`}>
                                        <div className="h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl">
                                            <img
                                                src={cafe.image}
                                                alt={cafe.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <p className="font-bold uppercase bg-black text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                                            {cafe.location.city}
                                        </p>
                                        <p className="font-bold uppercase bg-green text-white rounded-none mb-1 mt-4 mx-1 px-1.5 text-base italic leading-6 inline-block">
                                            {cafe.location.country}
                                        </p>
                                        <p className="font-bold">{cafe.title}</p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center italic">
                                <p className="mt-2">You haven't add anything to your wishlist yet. Keep exploring, little Sweet Spotter.</p>
                            </div>
                        )}
                    </div>
                </div>
          ) : (
            <div>
                <Link to="/login" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded inline-block">
                    Login
                </Link>
            </div>
        )}
        </div>
    );
}

export default MySpace;