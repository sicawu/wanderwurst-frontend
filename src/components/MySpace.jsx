import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function MySpace() {
    const location = useLocation();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Check if profile is passed via state
        if (location.state && location.state.profile) {
            setProfile(location.state.profile);
        } else {
            // If no profile in state, try to get it from localStorage
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
                setProfile(JSON.parse(storedProfile));
            }
        }
    }, [location.state]);

    const handleLogout = () => {
        // Clear the user profile from local storage and reset state
        localStorage.removeItem('userProfile');
        setProfile(null);
        // Redirect to the login page or any other page
        window.location.href = '/'; // or use `useNavigate` from `react-router-dom`
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
                            src={profile.picture} alt="{profile.name}"
                        />
                        <p>I'm happy to have you here, {profile.given_name}.</p>
                        <p>Your Email: {profile.email}</p>
                        {/* Logout Button */}
                        <button
                            className="inline-flex items-center justify-center px-4 py-3 my-10 font-semibold text-white bg-coral hover:bg-black rounded-lg transition-colors ease-out duration-200"
                            onClick={handleLogout} >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Link to Login */}
                    <Link to="/login" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded inline-block">
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MySpace;
