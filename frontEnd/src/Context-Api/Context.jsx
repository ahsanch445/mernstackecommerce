import React, { createContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const toastContext = createContext()


const ToastMessage = ({children})=>{
const [userLogout, setuserLogout] = useState(null)
const [ForceUpdate, setForceUpdate] = useState("")


return(
    <toastContext.Provider value={{userLogout, setuserLogout,ForceUpdate, setForceUpdate,}}>

    {children}
</toastContext.Provider>
)


}
export default  ToastMessage