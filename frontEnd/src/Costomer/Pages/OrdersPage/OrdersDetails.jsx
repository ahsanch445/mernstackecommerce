import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ShowOrderAdddess from './ShowOrderAdddess';
import { useLocation } from 'react-router-dom';
import { toastContext } from '../../../Context-Api/Context';
import moment from 'moment';
const AdminOrderPage = () => {
 let location =  useLocation()



let data = location.state.data
let Orderdets = data;





 




  return (
  
    
        
<div key={ Orderdets?._id} className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order ID: { Orderdets?._id}</h2>
        <h2 className="text-2xl font-semibold mb-4">Address: </h2>
        <>
        
        <ShowOrderAdddess AddressData={ Orderdets?.deliveryAddrss}/
        ></>
            
       
        <div className="mb-1">
          <p><span className="font-semibold">Total Price:</span> <span className='font-semibold'>Rs</span> { Orderdets ?.totalPrice}</p>
          <p><span className="font-semibold">Payment Status:</span> { Orderdets?.paymentStatus}</p>
          <p><span className="font-semibold">Order Created At:</span> {moment(Orderdets?.createdAt).format('LL')} </p>

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
             
              <th className="text-start px-4 py-2">Price</th>
             
             
            </tr>
          </thead>
          <tbody>
          {
            Orderdets?
            Orderdets ?.orderData.map((item,index)=>{
              return(
                <>
          
                  <tr key={index}>
                  
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item?.name}</td>
                <td className="border px-4 py-2">{item?.
brand}</td>
                <td className="border px-4 py-2">{item?.productSize}</td>
                <td className="border px-4 py-2">{item?.productQuantity}</td>
                <td className="border px-4 py-2">{Orderdets?.paymentStatus}</td>
                
             
                <td className="border px-4 py-2">{item.price}</td>
                
              </tr>
                </>
              )
            })
            : Orderdets?.orderData?.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item?.productName}</td>
                <td className="border px-4 py-2">{item?.brandName}</td>
                <td className="border px-4 py-2">{item?.productSize}</td>
                <td className="border px-4 py-2">{item?.productQuantity}</td>
                <td className="border px-4 py-2">{Orderdets?.paymentStatus}</td>
                
                
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
