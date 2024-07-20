import React, { useContext, useEffect, useState ,} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toastContext } from '../../../Context-Api/Context';
import DeleteIcon from '@mui/icons-material/Delete';
const Order = () => {
    const [OrderDetails, setOrderDetails] = useState([])
  
    let navigate=useNavigate()
    const [Data, setData] = useState()

    const [toggle, settoggle] = useState();


    ///update data 

    const handleAddressChange = async(event,Id ) => {
      let elem = event.target.value
     
     try {
      let res = await axios.post("http://localhost:3000/order/admin/update",{
        paymentStatus:elem ,
        Id:Id,
        
      })
      setData(res?.data)
  
     } catch (error) {
      console.error(error)
     }
      // setSelectedAddress(event.target.value);
    };
  const handleDel = async(elemId)=>{
try {
  let data = axios.post("http://localhost:3000/order/admin/delete",{id:elemId})
  if(data.res){
    settoggle(data.res);
  }
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
        }, [Data,toggle])
  return (

    <>
     <table  className="table-auto w-full">
 
 
  <thead >
            <tr >
             
              <th className="text-start px-4 py-2">Sr</th>
              <th className="text-start px-4 py-2">Order Id</th>
       
              <th className="text-start px-4 py-2">paymentStatus</th>
              
              <th className="text-start px-4 py-2">Delivery Status</th>
              <th className="text-start px-4 py-2">Show Details</th>
              
              <th className="text-start px-4 py-2">Delete Order</th>
            </tr>
          </thead>
  
    {
       OrderDetails.map((elem,index)=>{
        return(
       
              
              <tbody>
                
                    <tr >
                      <td className="border px-4 py-2">{index+1}</td>
                      <td className="border px-4 py-2">{elem._id}</td>
                     { console.log(elem.deliveryStatus)}
                      <td className="border  px-4 py-2">{elem?.paymentStatus}</td>
                      <td className="border px-4 py-2">
                  <select
         
              value={elem?.deliveryStatus}
                  
                    onChange={(event )=>handleAddressChange(event,elem._id)}
                    className="bg-gray-100 rounded-lg p-2"
                  >
                    <option >Pending</option>
                    <option >Confrimed Order</option>
                    <option >Shipped Order</option>
                    <option >Delivered Order</option>
                  </select>
                </td>
                      <td onClick={()=>{
                      
                        settoggle(elem)
                        navigate("/admin/orders/details",{state:{data:elem}})
                      }} className="border  px-4 py-2 cursor-pointer">
                      <EditIcon />
                      </td>
                      <td onClick={()=>handleDel(elem._id)}  className="border cursor-pointer px-4 py-2"><  DeleteIcon/></td>
                    </tr>
                 
                
              </tbody>
         
    
        )
      })
    }
       </table>
    </>
 
  )
}

export default Order