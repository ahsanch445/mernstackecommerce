import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const Outh = () => {
 let navigate = useNavigate()
 
  const [userData, setuserData] = useState({})

  
  const sendUserData =async ()=>{
    try {
      const res = await axios.post("http://localhost:3000/auth/user",userData)
  
     console.log(res)
      if(res.data.success == true)
        {
        window.localStorage.setItem("user", JSON.stringify(res.data.user))
       
          navigate("/")
  
      }
    } catch (error) {
      console.error(error)
    }
   
  }
 
  

  useEffect(() => {
    if (userData.name !== undefined) {
      sendUserData();
    }
  }, [userData.name]);
  




  
  
  return (

      <GoogleLogin
  onSuccess={credentialResponse => {
    
    const decode = jwtDecode(credentialResponse.credential)
    setuserData(decode)
   
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

  )
}

export default Outh

