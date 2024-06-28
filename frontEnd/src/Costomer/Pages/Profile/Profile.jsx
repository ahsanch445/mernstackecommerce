import React, { useEffect, useState } from 'react'
import Loader from '../../Components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import UserDetails from '../../Components/UserDetails/UserDetails'
import { Outlet } from 'react-router-dom'
import AllUsers from '../Alluser/AllUsers'


import Cookies from "js-cookie"
import Navigation from '../../Components/Navigation/Nav'
const Profile = () => {
const [single, setsingle] = useState(null)
 
   const [user, setuser] = useState()
   console.log("i", user)
    
    useEffect(() => {
    
    
      const user1 = JSON.parse(localStorage.getItem("user"))
  setuser(user1)
    }, [])
      
  
  return (
   <>
  
    <div className='flex'>
    
    <div className='w-1/5 '>
       <UserDetails user={user}/>
     
    </div>
    
    
    <Outlet />
    </div>
    
   </>
  )
}

export default Profile