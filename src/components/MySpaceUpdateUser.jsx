import React, { useState } from 'react';
import axios from 'axios';

const EditUser = ({ googleId, id, currentName, currentEmail }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [name, setName] = useState(currentName);
    const [email, setEmail] = useState(currentEmail);
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${API_URL}/user/${googleId || id}`, { name, email });
            setStatusMessage('User information updated successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating user information:', error);
            setErrorMessage('Failed to update user information.');
            setStatusMessage('');
        }
    };

    return (
        <div>
            <h2>Edit User Information</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border border-gray-300 rounded px-2 py-1 mb-2"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-gray-300 rounded px-2 py-1 mb-2"
                />
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2">
                    Update
                </button>
            </form>
            {statusMessage && <p className="text-green-500 mt-2">{statusMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
    );
};

export default EditUser;
