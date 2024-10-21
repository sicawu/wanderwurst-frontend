import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

function GoogleLogIn() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    // Check if user data is in localStorage
    const storedProfile = localStorage.getItem('userProfile');
    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedProfile && storedAccessToken) {
      setProfile(JSON.parse(storedProfile)); // Restore profile from localStorage
      navigate('/my-space', { state: { profile: JSON.parse(storedProfile) } }); // Redirect to /my-space
    }

    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
          // Store profile and token in localStorage
          localStorage.setItem('userProfile', JSON.stringify(res.data));
          localStorage.setItem('accessToken', user.access_token);
          // Redirect to /my-space page
          navigate('/my-space', { state: { profile: res.data } });
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen pb-20">
      <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
        Become a Sweet Spotter</h1>
      <div className="flex flex-col items-center">

        <p className="text-1xl pt-10 px-10 flex justify-center text-center ">
          I'm proud and happy, you're here. Join our little community for free and save your favorite sweet spots!</p>
        {profile ? (
          <>
          </>
        ) : (
          <button
            className="flex flex-row justify-center items-center gap-2 text-black font-bold py-2 my-10 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200"
            onClick={handleLogin}
            aria-label="Sign in with Google"
          >
            <FcGoogle />
            Sign in with Google
          </button>
        )}
      </div>

    </div>

  );
}

export default GoogleLogIn;
