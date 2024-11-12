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
    const [allCafes, setAllCafes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({ name: '', email: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [availableCities, setAvailableCities] = useState([]);
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
        // Update filtered cafes when selectedCity changes
        const filtered = selectedCity
            ? allCafes.filter(cafe => cafe.location.city === selectedCity)
            : allCafes;
        setFilteredCafes(filtered);
    }, [selectedCity, allCafes]);


    useEffect(() => {
        const fetchWishlist = async () => {
            if (profile && (profile.googleId || profile.id)) {
                try {
                    const response = await axios.get(`${API_URL}/user/${profile.googleId || profile.id}`);
                    const cafes = response.data.wishlist || [];
                    setFilteredCafes(cafes);
                    setAllCafes(cafes);
                    const urlSlugs = cafes.map(cafe => cafe.urlSlug);
                    localStorage.setItem('wishlist', JSON.stringify(urlSlugs));
                    // Update available cities when cafes are fetched
                    const cities = [...new Set(cafes.map(cafe => cafe.location.city))];
                    setAvailableCities(cities);
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
            setProfile(response.data);
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

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`${API_URL}/user/${profile.googleId || profile.id}`);
            setProfile(null);
            navigate('/');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="min-h-screen pb-10 bg-gray-50">
            {profile ? (
                <div>
                    <h1 className="bg-black text-white uppercase text-center text-3xl px-3 py-2 font-extrabold italic">
                        <span className="text-teal"> {profile.name}'s</span> Sweet Spots
                    </h1>
                    <div className="flex flex-col items-center justify-center mt-12">
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
                    <div className="flex justify-center mt-2">
                        <Link to={`/user/${profile.googleId || profile.id}`} className="flex items-center text-teal underline">
                            <MdKeyboardDoubleArrowRight className="mr-1" />
                            Share Wishlist With Friends
                        </Link>
                    </div>
                    <div className="flex justify-center mt-2">
                        <Link to="/best-cafes" className="flex items-center text-teal underline">
                            <MdKeyboardDoubleArrowRight className="mr-1" />
                            Discover More Cafes
                        </Link>
                    </div>

                    {/* City Filter Dropdown */}
                    <div className="flex flex-col items-center">
                        <div className="mt-8 w-60 rounded-full shadow-md">
                            <select
                                value={selectedCity}
                                onChange={e => setSelectedCity(e.target.value)}
                                className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"                            >
                                <option value="">All Cities</option>
                                {availableCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Cafe Wishlist Display */}
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
                    <div className="flex flex-col items-center bg-gray-100 rounded-2xl mx-5 p-5 mt-10">
                        <h2 className="text-2xl font-extrabold uppercase text-center text-gray-800">
                            Personal Details
                        </h2>
                        {!editMode ? (
                            <div className="text-center mt-5">
                                {/*<img
                                    className="w-24 h-24 rounded-full object-cover my-5"
                                    src={profile.picture} alt={profile.name}
                                /> */}
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

                        <div className="flex flex-row">
                            {/* Delete Button */}
                            <button
                                className="mt-10 mr-5 px-6 font-semibold text-white bg-red-600 hover:bg-red-800 rounded-lg transition-colors"
                                onClick={() => setShowDeleteConfirm(true)}>
                                Delete Profile
                            </button>

                            {/* Confirmation Dialog */}
                            {showDeleteConfirm && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white rounded-lg p-5 shadow-lg">
                                        <h3 className="text-lg font-bold">Are you sure you want to delete your profile?</h3>
                                        <p className="italic mb-8">There's no way back if deleted. Be sure, you want to leave. :)</p>
                                        <div className="flex justify-between">
                                            <button
                                                className="mr-10 px-8 py-2 bg-red-600 text-white rounded hover:bg-red-800"
                                                onClick={handleDeleteUser}>
                                                Yes
                                            </button>
                                            <button
                                                className="px-20 py-2 bg-teal text-white rounded hover:bg-gray-400"
                                                onClick={() => setShowDeleteConfirm(false)}>
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Logout Button */}
                            <button
                                className="mt-10 px-16 py-2 font-semibold text-white bg-teal hover:bg-gray-800 rounded-lg transition-colors"
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
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