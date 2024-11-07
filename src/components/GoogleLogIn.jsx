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
          console.log(`User profile`, userProfile);

          const userData = {
            email: userProfile.email,
            name: userProfile.given_name,
            googleId: userProfile.id,
            picture: userProfile.picture,
          };

          console.log(userData);

          // First, check if the user already exists in the database
          axios.get(`${API_URL}/user/check`, { params: { googleId: userData.googleId } })
            .then((response) => {
              if (response.data.exists) {
                // User exists, retrieve their data
                console.log('User  already exists:', response.data.user);
                navigate('/my-space', { state: { profile: response.data.user } });
              } else {
                // User does not exist, proceed to register
                axios.post(`${API_URL}/user/register`, userData)
                  .then((response) => {
                    console.log('User  registered:', response.data);
                    navigate('/my-space', { state: { profile: userProfile } });
                  })
                  .catch((error) => {
                    console.error('Error registering user:', error);
                  });
              }
            })
            .catch((error) => {
              console.error('Error checking user existence:', error);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 min-h-screen pb-20">
      <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
        Become a<br />
        <span className="text-teal">Sweet Spotter </span>
      </h1>
      <div className="flex flex-col items-center">
        <p className="text-lg text-white pt-14 px-4 max-w-md">
          I'm proud and happy you're here. Join our community for free and save your favorite sweet spots!
        </p>

        {profile ? null : (
          <button
            className="flex items-center gap-3 text-black bg-white font-bold py-3 px-5 mt-12 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-200 transition duration-300 ease-in-out"
            onClick={handleLogin}
            aria-label="Sign in with Google"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>
        )}
      </div>

    </div>

  );
}

export default GoogleLogIn;