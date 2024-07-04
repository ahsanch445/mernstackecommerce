import React, { useContext, useEffect, useState ,} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toastContext } from '../../../Context-Api/Context';
import DeleteIcon from '@mui/icons-material/Delete';
const Order = () => {
    const [OrderDetails, setOrderDetails] = useState([])
    let navigate=useNavigate()
    const [toggle, settoggle] = useState(false);
  const handleDel = async(elemId)=>{
try {
  let data = axios.post("http://localhost:3000/order/admin/delete",{id:elemId})
  settoggle(prev => !prev);
} catch (error) {
  console.error(error)
}
  }
    let  getAdminData = async()=>{
     
        try {
            let res = await axios.get("http://localhost:3000/order/admin")
          
            setOrderDetails(res?.data)
        } catch (error) {
            console.error(error)
        }
        } 
        useEffect(() => {
          
        getAdminData()
        //  console.log("hello")
        }, [toggle])
  return (
  OrderDetails.map((elem,index)=>{
    return(
        <table key={elem._id} className="table-auto w-full">
          <thead>
            <tr>
             
              <th className="text-start px-4 py-2">Sr</th>
              <th className="text-start px-4 py-2">Order Id</th>
       
              <th className="text-start px-4 py-2">paymentStatus</th>
              
              <th className="text-start px-4 py-2">Show Details</th>
              <th className="text-start px-4 py-2">Delete Order</th>
            </tr>
          </thead>
          <tbody>
            
                <tr >
                  <td className="border px-4 py-2">{index+1}</td>
                  <td className="border px-4 py-2">{elem?._id}</td>

                  <td className="border  px-4 py-2">{elem?.paymentStatus}</td>
             
                  <td onClick={()=>{
                    settoggle(elem)
                    navigate("/admin/orders/details",{state:{data:elem}})
                  }} className="border  px-4 py-2 cursor-pointer">
                  <EditIcon />
                  </td>
                  <td onClick={()=>handleDel(elem._id)}  className="border cursor-pointer px-4 py-2"><  DeleteIcon/></td>
                </tr>
             
            
          </tbody>
        </table>

    )
  })
  )
}

export default Order