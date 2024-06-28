import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';
const OrderData = () => {
  let Navigate = useNavigate()
  return (
    <div onClick={()=>{
      Navigate(`/account/myorder/${6}`)
    }} className=' cursor-pointer p-4 h-fit box flex justify-between  mt-4'>
      <div className='flex gap-2 tracking-tighter'>
        <img className='w-16 h-16 object-cover object-top rounded' src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc3VpdHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
        <div >
            <p className='font-medium leading-none '>Men Slim kurta Blacks jeans</p>
            <p className=' text-xs'>Size L</p>
            <p className='text-xs'>Color Black</p>
        </div>
      </div>
      <div><p>Rs3000</p></div>
      <div>
        <div className='flex items-center'>
            < AdjustIcon style={{color:"green",fontSize:"2vw"}}/>
            <h1 className='text-[1.5vw] font-medium'>Expected Delivery On Mar 03</h1>
        </div>
        <p className='text-[1.3vw] ml-2'>You order has been delivered</p>
      </div>
    </div>
  )
}

export default OrderData
