// src/components/GoogleLoginComponent.js
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const GoogleLoginComponent = () => {
    let navigate = useNavigate()
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`);
       
        let data = res.data

       let user=  await axios.post('https://ecommerce-api-one-iota.vercel.app/auth/user',data);
        
        localStorage.setItem("user",JSON.stringify(user?.data?.user))
navigate("/")
        toast.success('Login successful!');
      } catch (error) {
        console.error('Login failed:', error);
        toast.error('Login failed. Please try again.');
      }
    },
    onFailure: (response) => {
      console.error('Login failed:', response);
      toast.error('Login failed. Please try again.');
    },
  });

  return (
    <div>
      <button
  onClick={() => login()}
  className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
>
  <img
    src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
    alt="Google logo"
    className="w-6 h-6 mr-2"
  />
  <span className="text-gray-700 font-medium">Login with Google</span>
</button>

    </div>
  );
};

export default GoogleLoginComponent;
