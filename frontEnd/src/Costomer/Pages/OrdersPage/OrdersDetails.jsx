import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ShowOrderAdddess from './ShowOrderAdddess';
import { useLocation } from 'react-router-dom';
import { toastContext } from '../../../Context-Api/Context';

const AdminOrderPage = () => {
 let location =  useLocation()
const [  Data, setData] = useState()


let data = location.state.data
let Orderdets = data;





 


  const handleAddressChange = async(event,Id,deliveryId ) => {
    let elem = event.target.value
   
   try {
    let res = await axios.post("http://localhost:3000/order/admin/update",{
      paymentStatus:elem ,
      Id:Id,
      deliveryId :deliveryId 
    })
    setData(res?.data.data)

   } catch (error) {
    console.error(error)
   }
    // setSelectedAddress(event.target.value);
  };

  return (
  
    
        
<div key={ Orderdets?._id} className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order ID: { Orderdets?._id}</h2>
        <h2 className="text-2xl font-semibold mb-4">Address: </h2>
        <>
        
        <ShowOrderAdddess AddressData={ Orderdets?.orderAddress}/
        ></>
            
       
        <div className="mb-1">
          <p><span className="font-semibold">Total Price:</span> ${ Orderdets ?.totalPrice}</p>
          <p><span className="font-semibold">Payment Status:</span> { Orderdets?.paymentStatus}</p>
          <p><span className="font-semibold">Order Created At:</span> {new Date( Orderdets?.createdAt).toLocaleString()}</p>

        </div>
        <h3 className="text-xl font-semibold mb-4">Items:</h3>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-start px-4 py-2">Sr</th>
              <th className="text-start px-4 py-2">Product Name</th>
              <th className="text-start px-4 py-2">Brand Name</th>
              <th className="text-start px-4 py-2">Product Size</th>
              <th className="text-start px-4 py-2">Qtn</th>
              <th className="text-start px-4 py-2">Payment</th>
              <th className="text-start px-4 py-2">Delivery Status</th>
              <th className="text-start px-4 py-2">Delivery Address</th>
             
             
            </tr>
          </thead>
          <tbody>
          {
            Data?
            Data?.items.map((item,index)=>{
              return(
                <>
            
                  <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item?.productName}</td>
                <td className="border px-4 py-2">{item?.brandName}</td>
                <td className="border px-4 py-2">{item?.productSize}</td>
                <td className="border px-4 py-2">{item?.productQuantity}</td>
                <td className="border px-4 py-2">{Orderdets?.paymentStatus}</td>
                
                <td className="border px-4 py-2">
                  <select
         
              value={item?.deliveryStatus}
                  
                    onChange={(event )=>handleAddressChange(event,Orderdets._id,item._id)}
                    className="bg-gray-100 rounded-lg p-2"
                  >
                    <option >Pending</option>
                    <option >Confrimed Order</option>
                    <option >Shipped Order</option>
                    <option >Delivered Order</option>
                  </select>
                </td>
                <td className="border px-4 py-2">{item.deliveryStatus}</td>
                <td className="border px-4 py-2">
                
                </td>
              </tr>
                </>
              )
            })
            : Orderdets?.items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item?.productName}</td>
                <td className="border px-4 py-2">{item?.brandName}</td>
                <td className="border px-4 py-2">{item?.productSize}</td>
                <td className="border px-4 py-2">{item?.productQuantity}</td>
                <td className="border px-4 py-2">{Orderdets?.paymentStatus}</td>
                
                <td className="border px-4 py-2">
                  <select
         
              value={item?.deliveryStatus}
                  
                    onChange={(event )=>handleAddressChange(event,Orderdets._id,item._id)}
                    className="bg-gray-100 rounded-lg p-2"
                  >
                    <option >Pending</option>
                    <option >Confrimed Order</option>
                    <option >Shipped Order</option>
                    <option >Delivered Order</option>
                  </select>
                </td>
                <td className="border px-4 py-2">{item.deliveryStatus}</td>
                <td className="border px-4 py-2">
                
                </td>
              </tr>
            ))}
          
          </tbody>
        </table>
      </div>
    </div>
        
  );
};

export default AdminOrderPage;
