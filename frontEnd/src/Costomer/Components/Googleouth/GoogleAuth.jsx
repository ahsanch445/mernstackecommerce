import axios from 'axios'
import React, { useEffect, useState } from 'react'


const GoogleAuth = () => {
    const [callbackData, setcallbackData] = useState()
    useEffect(() => {
        const authCall = async()=>{
          const res = await axios.get("http://localhost:3000/auth/google/callback")
          console.log(res.data)
          setcallbackData(res.data)
        } 
      authCall()
        
      }, [])
  return (
    <div>{
        callbackData?<div>{callbackData}</div>:
        <div>
            hello bhai
        </div>
        
        }</div>
  )
}

export default GoogleAuth