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
        localStorage.removeItem("wishlist");
        localStorage.removeItem("userProfile");
    };

    return (
        <div className="min-h-screen pb-10 bg-gray-50">
            {profile ? (
                <div>
                    <h1 className="bg-black text-white uppercase text-center text-3xl px-3 py-2 font-extrabold italic">
                    <span className="text-teal"> {profile.name}'s</span> Sweet Spots
                    </h1>
                    <div className="flex flex-col items-center justify-center mt-5">
                        <img
                            className="w-24 h-24 rounded-full object-cover my-5"
                            src={profile.picture} alt={profile.name}
                        />
                        <p className="mx-10 text-gray-700">
                            Welcome (back), you little legend. I'm happy to have you here, {profile.name}.
                        </p>
                        <p className="italic text-xs mt-2 text-gray-500">
                            Lots of love, Simona xx
                        </p>
                    </div>

                    {/* Wishlist Section */}
                    <h2 className="pt-16 text-4xl font-extrabold uppercase text-center text-gray-800">
                        Your Wishlist
                    </h2>
                    <div className="flex justify-center mt-5">
                        <Link to="/best-cafes" className="flex items-center text-teal underline">
                            <MdKeyboardDoubleArrowRight className="mr-1" />
                            Discover More Cafes
                        </Link>
                    </div>
                    <div className="px-5 flex flex-wrap justify-center mt-10 pb-10">
                        {filteredCafes.map((cafe) => (
                            <div key={cafe._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
                                <div className="relative h-72 w-full max-w-full rounded-lg shadow-md">
                                    <Link to={`/cafes/${cafe.urlSlug}`} className="h-full w-full block">
                                        <img src={cafe.image} alt={cafe.title} className="h-full w-full object-cover rounded-lg" />
                                    </Link>
                                    <div className="absolute top-4 right-4">
                                        <WishlistButton urlSlug={cafe.urlSlug} />
                                    </div>
                                </div>
                                <Link to={`/cafes/${cafe.urlSlug}`} className="block mt-4 text-center">
                                    <p className="font-bold uppercase bg-mint text-gray-800 rounded-full mb-1 mr-1 px-2 py-1 inline-block">
                                        {cafe.location.city}
                                    </p>
                                    <p className="font-bold uppercase bg-teal text-white rounded-full mb-1 px-2 py-1 inline-block">
                                        {cafe.location.country}
                                    </p>
                                    <p className="font-bold text-gray-900">{cafe.title}</p>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Personal Details Section */}
                    <div className="bg-gray-100 rounded-2xl mx-5 p-5 mt-10">
                        <h2 className="text-2xl font-extrabold uppercase text-center text-gray-800">
                            Personal Details
                        </h2>
                        {!editMode ? (
                            <div className="text-center mt-5">
                                <p><b>Name:</b> {profile.name}</p>
                                <p><b>Email:</b> {profile.email}</p>
                                <button onClick={handleEditClick} className="text-teal mt-2">
                                    <FiEdit />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center mt-5">
                                <input
                                    type="text"
                                    value={updatedProfile.name}
                                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
                                    className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                                />
                                <input
                                    type="email"
                                    value={updatedProfile.email}
                                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}
                                    className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                                />
                                <button onClick={handleSaveClick}
                                    className="bg-teal text-white rounded px-4 py-1 mt-3 hover:bg-mint transition">
                                    Save
                                </button>
                            </div>
                        )}
                        {/* Logout Button */}
                        <button
                            className="mt-10 px-6 py-2 font-semibold text-white bg-teal hover:bg-gray-800 rounded-lg transition-colors"
                            onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-20">
                    <Link to="/login" className="bg-teal text-white px-6 py-3 rounded-full inline-block">
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MySpace;
