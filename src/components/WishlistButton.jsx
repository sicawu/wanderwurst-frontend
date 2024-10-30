import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoHeartCircleOutline } from "react-icons/io5";

const WishlistButton = ({ urlSlug }) => {
    const [isWished, setIsWished] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Check local storage for wishlist
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsWished(storedWishlist.includes(urlSlug));
    }, [urlSlug]);

    const handleWishlistClick = async (event) => {
        event.stopPropagation(); // Prevent click from propagating to parent elements

        const userProfileString = localStorage.getItem('userProfile');
        const userProfile = userProfileString ? JSON.parse(userProfileString) : null;
        const userId = userProfile ? userProfile.id : null;

        if (userId) {
            try {
                let response;

                if (isWished) {
                    // Remove from wishlist
                    response = await axios.delete(`${API_URL}/user/${userId}/wishlist`, {
                        data: { urlSlug: urlSlug },
                    });
                } else {
                    // Add to wishlist
                    response = await axios.put(`${API_URL}/user/${userId}/wishlist`, {
                        urlSlug: urlSlug,
                    });
                }

                // Update local storage
                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                if (isWished) {
                    wishlist = wishlist.filter(item => item !== urlSlug);
                } else {
                    wishlist.push(urlSlug);
                }
                localStorage.setItem('wishlist', JSON.stringify(wishlist));

                // Update state
                setIsWished(!isWished);
            } catch (err) {
                console.error(err);
            }
        } else {
            console.error('User ID is not available');
        }
    };

    return (
        <div onClick={handleWishlistClick} style={{ cursor: 'pointer' }}>
            <IoHeartCircleOutline  
                size={60}
                className="transition-transform duration-200 hover:scale-110"
                color={isWished ? 'red' : 'white'}
            />
        </div>
    );
};

export default WishlistButton;
