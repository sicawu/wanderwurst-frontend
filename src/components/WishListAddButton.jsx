import React from 'react';
import axios from 'axios';

const WishlistButton = ({ cafeUrlSlug, userId }) => {
    const API_URL = import.meta.env.VITE_API_URL;

  const addToWishlist = async () => {
    try {
      const response = await 
      axios.put(`${API_URL}/user/${userId}/wishlist`, {
        urlSlug: cafeUrlSlug,
      });

      console.log(response.data.message); // Success message
      // Optionally update the UI or state here to reflect the change
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message); // Error message from server
      } else {
        console.error('Error:', error.message); // Other errors
      }
    }
  };

  return (
    <button onClick={addToWishlist} className="wishlist-button">
      <span role="img" aria-label="heart">❤️</span> Add to Wishlist
    </button>
  );
};

export default WishlistButton;