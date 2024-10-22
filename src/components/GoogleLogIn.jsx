import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

function GoogleLogIn() {
  const API_URL = import.meta.env.VITE_API_URL
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
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          const userProfile = res.data;
          setProfile(userProfile);
          localStorage.setItem('userProfile', JSON.stringify(userProfile));
          localStorage.setItem('accessToken', user.access_token);
          console.log(`Userprofile`, userProfile)
          const userData = {
            email: userProfile.email,
            name: userProfile.given_name,
            googleId: userProfile.id,
          };

          console.log(userData)

          // POST request to save user data
          axios.post(`${API_URL}/user/register`, userData)
            .then((response) => {
              console.log('User  registered:', response.data);
              navigate('/my-space', { state: { profile: userProfile } });
            })
            .catch((error) => {
              console.error('Error registering user:', error);
            });
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