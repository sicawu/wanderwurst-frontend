import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import WishlistButton from '../components/WishlistButton';

const API_URL = import.meta.env.VITE_API_URL;

function MySpacePublic() {
    const { userId } = useParams(); // Get the userId from the URL
    const [userProfile, setUserProfile] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    // States for city filter
    const [filteredCafes, setFilteredCafes] = useState([]);
    const [allCafes, setAllCafes] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [availableCities, setAvailableCities] = useState([]);

    useEffect(() => {
        const fetchPublicProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${userId}`);
                setUserProfile(response.data);
                setWishlist(response.data.wishlist);
                setAllCafes(response.data.wishlist); // Assuming wishlist contains cafe objects

                // Extract unique cities from the wishlist cafes
                const cities = [...new Set(response.data.wishlist.map(cafe => cafe.location.city))];
                setAvailableCities(cities);

                // Initialize filteredCafes with all cafes
                setFilteredCafes(response.data.wishlist);
            } catch (error) {
                console.error('Error fetching public profile:', error);
            }
        };

        fetchPublicProfile();
    }, [userId]);

    useEffect(() => {
        // Update filtered cafes when selectedCity changes
        const filtered = selectedCity
            ? allCafes.filter(cafe => cafe.location.city === selectedCity)
            : allCafes;
        setFilteredCafes(filtered);
    }, [selectedCity, allCafes]);



    return (
        <div className="min-h-screen pb-10 bg-gray-50">
            {userProfile ? (
                <div>
                    <h1 className="bg-black text-white uppercase text-center text-3xl px-3 py-2 font-extrabold italic">
                        <span className="text-teal"> {userProfile.name}'s</span> Sweet Spots
                    </h1>
                    <p className="mt-10 mx-10 text-gray-700">
                        You asked for it, here we go: My fav coffee places around the world. Thank me later.
                    </p>
    
                    {/* City Filter Dropdown */}
                    <div className="flex flex-col items-center">
                        <div className="mt-8 w-60 rounded-full shadow-md">
                            <select
                                value={selectedCity}
                                onChange={e => setSelectedCity(e.target.value)}
                                className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"
                            >
                                <option value="">All Cities</option>
                                {availableCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
    
                    {/* Cafe Wishlist Display */}
                    <div className="px-5 flex flex-wrap justify-center mt-10 pb-10">
                        {(selectedCity ? filteredCafes : allCafes).map(cafe => (
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
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p>User not found or profile is private.</p>
                </div>
            )}
        </div>
    );
}

export default MySpacePublic;