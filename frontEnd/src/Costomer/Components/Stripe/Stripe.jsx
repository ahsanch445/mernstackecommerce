import axios from 'axios';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe('pk_test_51PWx9YCdwAPgZ0JnYFKIjYMVmy8WatsMgeZ9IR0bpF5ZwLAaOsbFKWlgWrFUA3uJlgoVKsU8Nt3EqPX7d0Szb2Nq006Dyuabnn'); // Your publishable key

const Stripe = ({Cart,AddressData,myData}) => {
  console.log(Cart,"cart")
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage as a JSON string
console.log("user",user)
  const handleStripe = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post('http://localhost:3000/stripe/create-checkout-session', {myData, AddressData,userId: user?._id,Cart });
      console.log(res)
      const { url } = res.data;
     if(url){
      window.location.href = url;
     } // Redirect to Stripe checkout
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div onClick={handleStripe} >
      Check Out
    </div>
  );
};

export default Stripe;
