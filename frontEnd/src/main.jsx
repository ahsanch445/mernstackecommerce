import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ToastMessage, { toastContext } from './Context-Api/Context.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {store } from "./Store/store.js"
import {Provider } from "react-redux"
import { ToastContainer } from 'react-toastify'
ReactDOM.createRoot(document.getElementById('root')).render(
  
    

<BrowserRouter>

   <ToastMessage>
      <Provider store={store}>

     
   <GoogleOAuthProvider clientId="939751230320-9vv8qnp15adhkaa9tr479tlpttlj1dcv.apps.googleusercontent.com">
      <ToastContainer/>
   <App />
   </GoogleOAuthProvider>
   </Provider>
   </ToastMessage>
   </BrowserRouter>
 
  
  
    

  
   
   
  
)
