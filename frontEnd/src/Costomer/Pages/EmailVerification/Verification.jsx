import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import "./email.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const  Verification = () => {
  const [isError, setisError] = useState(false)
    let navigate = useNavigate()
    const { id } = useParams();
  const [isLoading, setisLoading] = useState(true)
   

    useEffect(() => {
        const verifyEmail = async () => {
          try {
            const response = await axios.get(`https://ecommerce-api-one-iota.vercel.app/auth/verifiy/${id}`);
            console.log(response.data)
           if(
            response.data
           ){
            setisLoading(false)
            // setuserRegister(response.data.message)
            toast.success(response.data.message)
           setTimeout(() => {
            navigate("/login")
           }, 1000);
                
           }
             
        
          } catch (error) {
          
            // toast.error(error.response.data.message)
            setisLoading(false)
            console.error('Error verifying email:', error);
            setisError(true)
          }
        };
        
        verifyEmail()
      }, [id])
  return (
   
  <>
  <ToastContainer/>
  {isLoading?<div className='h-[100vh] flex justify-center items-center'> 
    <h1 className='text-4xl font-semibold'>Loading...</h1>
  </div>:
  <div>
    
  <div className='main'>
  
  <div className="card">
    <div style={{borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto'}}>
      <i className="checkmark i2 text-lime-500">{!isError?"✓": <p className='text-red-700' style={{fontSize:"80px",marginLeft:"20px"}}></p>}</i>
    </div>
    <h1 className={isError?'h text-red-700':"h text-lime-500"}>{isError?"Failed":"Success"}</h1> 
    <p className='p1'>Email verification {isError?"Failed":"Successfully"}<br /></p>
  </div>
</div>
  </div>
  }
  
  </>






  
   
  )
}

export default Verification