import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';
import moments from 'moment'
import ReviewsIcon from '@mui/icons-material/Reviews';

const OrderData = ({data,deliveryStatus,createdAt,handleData}) => {

  let Navigate = useNavigate()
  return (
 <>
    <div  className=' cursor-pointer p-4 h-fit box flex justify-between  mt-4'>
      
      <div className='flex gap-2 tracking-tighter'>
        <img className='w-16 h-[70px] object-cover object-top rounded' src={data?.image} alt="" />
        <div >
            <p className='font-medium leading-none '>{data?.name}</p>
            <p className=' text-xs'><span className='text-sm font-normal'>Size :</span> { data?.productSize}</p>
            <p className=' text-xs'><span className='text-sm font-normal'>Brand :</span> { data?.brand}</p>
            <p className='text-xs'><span className='text-sm font-normal'>Quantity :</span> {data?.productQuantity}</p>
        </div>
      </div>
     <div className='flex flex-col gap-6 absolute left-[40%] justify-center items-center'>
     <div><p>Rs{data?.price}</p></div>

     {
      deliveryStatus=="Delivered Order"?<div> <button  onClick={()=>handleData(data?.productId)} className='  p-1   rounded text-green-600 '><ReviewsIcon/> </button></div>:""

     }
     </div>
      <div>
        <div className='flex items-center'>
            < AdjustIcon style={{color:"green",fontSize:"2vw"}}/>
            <h1 className='text-[1.5vw] font-medium'>Expected Delivery On {moments(createdAt).add(5, 'days').format("DD-MM-YYYY")}</h1>
        </div>
        <p className='text-[1.3vw] ml-2'>You order has been {deliveryStatus}</p>
      </div>
    </div>

     
 </>
  )
}

export default OrderData
