import React, { useContext, useEffect,useState } from 'react'
import "../style/Login.css"
import { Link } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import   {toastContext}  from '../../../Context-Api/Context';
import Outh from '../../Components/Googleouth/Outh';
const SignUp = () => {
 const [isLoading, setisLoading] = useState(false)
  let navigate = useNavigate()
 let  {userRegister,setuserRegister} = useContext(toastContext)
  const [Register, setRegister] = useState({
    fullname:"",
    username:"",
    email:"",
    password:""
  })


  


  const handalRegister =(e)=>{
setRegister({
  ...Register,
  [e.target.name]:e.target.value
})




  }

 
  const onSubmit =async (e)=>{
    e.preventDefault()
    setisLoading(true)
    try {
      let res = await axios.post("http://localhost:3000/auth/register",Register)
  if(res.data){
    toast.success(res.data.message)
  console.log(res.data)
    setisLoading(false)
    // navigate("/login")
 
  };
  
 
  }
    
    catch (error) {
  
      setTimeout(() => {
        setisLoading(false)
      }, 1000);
     
   
      
      toast.error(error.response.data.message)
      console.error(error.response.data.message)
    }
  }

  
  return (
    <>
   
    <div className='flex justify-center items-center h-screen
fixed  w-full'>
    <div className="login-container lg:w-3/4   ">
     <form  onSubmit={onSubmit} style={{boxShadow: "  rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}} className="login-form  py-3  px-16  rounded-md shadow-md  bg-[#ffff] lg:gap-1">
       <h1 className='text-7xl lg:text-5xl'>Welcome</h1>
       <p className='text-3xl lg:text-sm mt-5 mb-10'>Please login to your account</p>
       <div className="input-group pb-8 lg:pb-0">
         <input onChange={handalRegister} className='p-7 lg:p-1 text-4xl lg:text-xl w-[550px] lg:w-56' type="text" id="username" name="fullname" placeholder="FullName" required />
       </div>
       <div className="input-group pb-8 lg:pb-0 ">
         <input onChange={handalRegister} className='p-7 lg:p-1 text-4xl lg:text-xl w-[550px] lg:w-56' type="text" id="username" name="username" placeholder="UserName" required />
       </div>
       <div className="input-group pb-8 lg:pb-0 ">
         <input onChange={handalRegister} className='p-7 lg:p-1 text-4xl lg:text-xl w-[550px] lg:w-56' type="text" id="username" name="email" placeholder="Email" required />
       </div>
       <div className="input-group pb-8 lg:pb-0">
         <input onChange={handalRegister} className='p-7 lg:p-1 text-4xl lg:text-xl w-[550px] lg:w-56' type="password" id="password" name="password" placeholder="Password" required />
       </div>
       <button  className={`bg-[#007bff] butto p-7 lg:p-1 text-4xl lg:text-xl pb-8 lg:pb-1 ${isLoading?"pointer-events-none":""}`} type="submit">{isLoading?"Loading...":"Register"}</button>
       <div className="bottom-text">
         <p className='text-4xl mt-0 lg:text-lg'>Already Have a Account <Link to="/login">Login</Link></p>
         <Outh/>
       </div>
     </form>
   
   </div>
   
    </div>
  
       </>
  )
}

export default SignUp