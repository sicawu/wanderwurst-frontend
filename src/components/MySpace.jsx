import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import WishlistButton from '../components/WishlistButton';

const API_URL = import.meta.env.VITE_API_URL;

function MySpace({ profile, setProfile }) {
    const location = useLocation();
    const [filteredCafes, setFilteredCafes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${profile.googleId || profile.id}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (profile && (profile.googleId || profile.id)) {
            fetchProfile();
        } else if (location.state && location.state.profile) {
            setProfile(location.state.profile);
        }
    }, [profile?.googleId, profile?.id, location.state]);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (profile && (profile.googleId || profile.id)) {
                try {
                    const response = await axios.get(`${API_URL}/user/${profile.googleId || profile.id}`);
                    setFilteredCafes(response.data.wishlist || []);
                    const urlSlugs = response.data.wishlist.map(cafe => cafe.urlSlug);
                    localStorage.setItem('wishlist', JSON.stringify(urlSlugs));
                } catch (error) {
                    console.error('Error fetching wishlist:', error);
                }
            }
        };

        fetchWishlist();
    }, [profile]);

    const handleEditClick = () => {
        setEditMode(true);
        setUpdatedProfile({ name: profile.name, email: profile.email });
    };

    const handleSaveClick = async () => {
        const updatedUser = {
            name: updatedProfile.name,
            email: updatedProfile.email
        };

        try {
            const response = await axios.put(`${API_URL}/user/${profile.googleId || profile.id}`, updatedUser);
            setProfile(response.data); // Update profile with backend confirmation
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleLogout = () => {
        setProfile(null);
        navigate('/');
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
                        {!editMode ? (
                            <div>
                                <p>I'm happy to have you here, {profile.name}.</p>
                                <p>Your Email: {profile.email}</p>
                                <button onClick={handleEditClick} className="text-gray-500 ml-2">
                                    <FiEdit />
                                </button>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    value={updatedProfile.name}
                                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
                                    className="border border-gray-300 rounded px-2 py-1 mb-2"
                                />
                                <input
                                    type="email"
                                    value={updatedProfile.email}
                                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}
                                    className="border border-gray-300 rounded px-2 py-1 mb-2"
                                />
                                <button onClick={handleSaveClick} className="text-white bg-coral hover:bg-black rounded px-4 py-1">
                                    Save
                                </button>
                            </div>
                        )}

                        {/* Logout Button */}
                        <button
                            className="inline-flex items-center justify-center px-4 py-3 my-10 font-semibold text-white bg-coral hover:bg-black rounded-lg transition-colors ease-out duration-200"
                            onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                    {/* Wishlist Section */}
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
                                <div key={cafe._id} className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5">
                                    <Link to={`/cafes/${cafe.urlSlug}`}>
                                        <div className="relative h-72 w-full max-w-full overflow-hidden border-solid rounded-2xl">
                                            <img src={cafe.image} alt={cafe.title} className="h-full w-full object-cover" />
                                            <WishlistButton
                                                className="absolute top-2 right-2 z-10"
                                                urlSlug={cafe.urlSlug}
                                                wishlist={filteredCafes.map(cafe => cafe.urlSlug)}
                                                updateWishlist={(urlSlug, isWished) => {
                                                    const newFilteredCafes = isWished
                                                        ? filteredCafes.filter(cafe => cafe.urlSlug !== urlSlug)
                                                        : [...filteredCafes, cafe];
                                                    setFilteredCafes(newFilteredCafes);
                                                    localStorage.setItem('wishlist', JSON.stringify(newFilteredCafes.map(cafe => cafe.urlSlug)));
                                                }}
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
                                <p className="mt-2">You haven't added anything to your wishlist yet. Keep exploring, little Sweet Spotter.</p>
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
