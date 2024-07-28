import { Avatar, Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import UserRatting from './UserRatting/UserRatting';
import RattingBar from './RattingBar/RattingBar';
import { KurtaData } from '../../Data/KurtaData';
import Card from '../HomeCard/Card';
import axios from 'axios';
import CategoryProducts from '../CategoryProducts/CategoryProducts';


const Ratting = ({ userRatting,sethandleRatting,product}) => {

 
  const [CateProduct, setCateProduct] = useState()
  const data = CateProduct?.filter((elem) => 
    elem.Categoryname === product.Categoryname &&
    elem.sections === product.sections &&
    elem.item === product.item&&
    product._id !== elem._id
  );
  
  
  
    const sendDataToBackend = async () => {
  
  
    try {
      const response = await axios.get(`https://ecommerce-api-one-iota.vercel.app/product/products`);
      setCateProduct(response.data)
   
    } catch (error) {
      console.error('Error sending data to backend:', error);
      }
    };
 
 useEffect(() => {
   
 sendDataToBackend();
  
 }, [])
 
  return (
    <>
    
    <div className='  flex '>
    <div className='w-1/2 '>

    {userRatting?.map((e,index)=><UserRatting key={index+1} data={e}/>)}
 {
  userRatting.length>0?   <div className='w-full flex justify-end '>
  <button onClick={()=>sethandleRatting((prev)=>!prev)}  className='cursor-pointer text-gray-600 text-sm'>Show more</button>
</div> :""
 }

    </div>

<div className='w-1/2 '>
{userRatting?.length>0?<RattingBar ratting = {userRatting}  product={product?.ratting}/>:""}

</div>
    
    </div>
{
  data?.length>0?  <>
      <hr />
    {/* //similair product */}
    <div>
      
      <h1 className='font-semibold '>
        Smiliar Product
      </h1>
   
      <div  className='flex mt-3 gap-5 flex-wrap px-5   cursor-pointer'>
      {data?.map((e,index)=><CategoryProducts key={index} data={e} />)}
      </div>
    </div>
  </> :""
}
    </>
  )
}

export default Ratting
