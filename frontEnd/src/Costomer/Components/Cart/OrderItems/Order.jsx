import React, { useEffect, useState } from 'react'
import "./OrderStyle.css"
import { useDispatch, useSelector } from 'react-redux'
import { CartQtn } from '../../../../Store/userSlice'
import { useLocation  } from 'react-router-dom'

const Order = ({handleRemoveCart,Cart}) => {
  console.log(
    Cart[0].productimage[0]
  )
  let dispatch = useDispatch()
let location = useLocation()

let myData = location?.state?.size


const [CartQtn1, setCartQtn] = useState(0)
const handleCartQtn = (id,data)=>{

 setCartQtn(data)
 dispatch(CartQtn({productId:id,data}))


}
  





  return (
  <>
    {
      Cart?.map((data)=>(
        <div className='mt-3'>
        <div className='box w-[55%] h-44 p-3 '>
      <div className='h-3/4 flex gap-2 '>
         <img className='h-full w-[10vw] object-top object-cover rounded ' src={data?.productimage[0]} alt="" srcset="" />
    <div>
     <p className='tracking-tighter font-semibold'>Mens : {data?.productname}</p>
     <p className='tracking-tighter opacity-85'>Brand : {data?.brandname}</p>
     <p className='tracking-tighter opacity-85'>Size : {myData?myData:"S"}</p>
     <div className='flex gap-1  items-center'>
     <p className='line-through opacity-70'>Rs{data?.price}</p>
    <p className='font-semibold' >Rs{data?.selling_price}</p>
    <p  className='text-green-600 tracking-tighter text-[1.5vw] '>{Math.floor(data?.discountParacentage)}%</p>
    </div>
    
    </div>
    
    
      </div>
      {/* add button increase and descrease */}
    <div className='flex gap-8 items-center'>
    
    {
      !data.isProductDetails?
      <>
      <div class="quantity-field mt-1 pl-1" >
    <button 
     class="value-button decrease-button" 
    onClick={()=> handleCartQtn(data._id,data?.productQuantity-1)}
     title="Azalt">-</button>
     <div class="number">{ data?.productQuantity}</div>
    <button 
    onClick={()=>handleCartQtn(data?._id,data?.productQuantity+1)}
     class="value-button increase-button" 
     onclick="increaseValue(this, 5)"
     title="Arrtır"
    >+
    </button>
    
    
    </div>
    <p onClick={()=>handleRemoveCart( data)} className='text-[#5e53ff] text-sm cursor-pointer'>Remove</p>
      </>
      : <div className='flex justify-center items-center gap-6 mt-2'>
         <div class="number"><span className='text-gray-500'>Quantity : </span>{ data?.productQuantity}</div>
         <p onClick={()=>handleRemoveCart( data)} className='text-[#5e53ff] text-sm cursor-pointer'>Remove</p>
      </div>
    }
    
    </div>
       </div>
    
     </div>
      ))
    }
  </>
  )
}

export default Order
