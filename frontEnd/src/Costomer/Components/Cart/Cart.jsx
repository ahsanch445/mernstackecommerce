import React, { useState } from 'react'
import Order from './OrderItems/Order'
import CardDetails from './CartDetails/CardDetails'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../../Store/userSlice'

const Cart = () => {
  let dispatch = useDispatch()
const [SizeGet, setSizeGet] = useState(null)





const Cart = useSelector((state) => state.addToCart.addToCart);



const handleRemoveCart = (data)=>{
 
dispatch(removeFromCart(data))
}
  return (
    <div className='p-8 relative'>

<Order  handleRemoveCart={handleRemoveCart}  Cart ={Cart}  />

<div className=' right-16 absolute top-8'>  <CardDetails setSizeGet={setSizeGet} handleRemoveCart={handleRemoveCart} Cart ={Cart}   / ></div>
    </div>  
    
  )
}

export default Cart
