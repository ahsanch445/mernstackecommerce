import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardDetails = ({handleRemoveCart,Cart}) => {
  
    let totlePrice = Cart.reduce((accumulator, ele) => {
        return accumulator + ele.selling_price * ele.productQuantity;
      }, 0);
      
    let Price = Cart.reduce((accumulator, ele) => {
        return accumulator + ele.price * ele.productQuantity;
      }, 0);
   
      let discountPrice = Price-totlePrice
      console.log(discountPrice)
    let navigate = useNavigate()
  return (
    <>
    {
        Cart.length !=[]?
        <div className='w-80 h-60 box p-5'>
        <h1 className='font-thin'>PRODUCT DETAILS</h1>
        <div className='mt-3 flex justify-between'>
            <p>Price ({Cart.length})</p>
            <p className=''>{Price}</p>
        </div>
        <div className='mt-3 flex justify-between'>
            <p>Discount Price</p>
            <p className='text-green-600'>Rs {discountPrice}</p>
        </div>
        <div className='mt-3 flex justify-between'>
            <p>Delivery Charges</p>
            <p className='text-green-600'>free</p>
        </div>
        <div className='mt-3 flex justify-between'>
            <p className='font-bold'>Totle Ammount</p>
            <p className='text-green-600'>Rs {totlePrice}</p>
        </div>
        <button onClick={()=>{
            navigate("/checkout?=2")
        }}  className='w-full mt-3 bg-[#4141ff] p-1 rounded-md text-[white] '>Check Out</button>
            </div>
        :""
    }
  
    </>
  )
}

export default CardDetails
