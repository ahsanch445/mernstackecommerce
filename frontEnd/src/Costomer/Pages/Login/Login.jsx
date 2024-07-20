import React, { useContext, useEffect, useState } from "react";
import "../style/Login.css";
import { Link, useNavigate,  } from "react-router-dom";
import  axios  from "axios";
import cookies from "js-cookie"
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastContext } from "../../../Context-Api/Context";
import Outh from "../../Components/Googleouth/Outh";

const Login = () => {
  let navigate = useNavigate()
  let { userLogout,setuserLogout} = useContext(toastContext)
// console.log(userRegister)
  useEffect(() => {
   
  
    


       
          if(userLogout){
            toast.success(userLogout)
            setuserLogout("")
          }
         
    
        
   
    
  }, [userLogout])
  
  


  
  const [LoginForm, setLoginForm] = useState({
    email:"",
    password:""
  })
  const handalLogin = (e)=>{
   
    
    setLoginForm({
      ...LoginForm,
      [e.target.name]:e.target.value
    })
  }
  const onSubmit =async (e)=>{
e.preventDefault()
try {
  let res = await axios.post("http://localhost:3000/auth/login",LoginForm)
  toast.success(res.data.message)
  
  if(res.data.token){
     
   cookies.set("token",res.data.token)
   navigate("/")
 
  }
} catch (error) {
  console.log(error)
  toast.error(error?.response?.data?.message)
  console.error(error)
}
  }


  return (
    <>
    <ToastContainer/>
      <div className="flex justify-center items-center h-[100vh] w-full">
        <div className="login-container lg:w-3/4  ">
          <form onSubmit={onSubmit }  style={{boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}} className="login-form bg-[#ffff]  fixed px-16 py-6 rounded-md flex justify-center items-center  lg:gap-1">
            <h1 className="text-7xl lg:text-4xl">Welcome Back</h1>
            <p className="text-3xl lg:text-lg mt-7 lg:mt-2">Please login to your account</p>
            <div className="input-group mt-7 lg:mt-5 ">
              <input onChange={handalLogin}
                className="p-7 lg:p-1 text-4xl lg:text-xl w-[550px] lg:w-56"
                type="text"
                id="username"
                name="email"
                placeholder="Username"
                required
              />
            </div>

            <div className="input-group mt-7 lg:mt-0">
              <input onChange={handalLogin}
                className="p-7 lg:p-1 text-4xl lg:text-xl w-[550px] lg:w-56"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="w-full  flex justify-center">
              <button
                className="bg-[#007bff]  butto p-7 lg:p-1 text-4xl lg:text-xl mt- w-[550px] lg:w-56"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="bottom-text">
              <p className="text-4xl lg:text-lg ">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              
              </p>
              <p className="text-4xl lg:text-lg   ">
             
               </p>
             
            </div>
           <div className=" flex justify-center mt-3">
           <Outh/>
           </div>
          </form>
        
        </div>
       
      </div>
    </>
  );
};

export default Login;
