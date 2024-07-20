import React, { useState } from 'react'
import Order from './OrderItems/Order'
import CardDetails from './CartDetails/CardDetails'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../../Store/userSlice'
import { Link } from 'react-router-dom'

const Cart = () => {
  let dispatch = useDispatch()
const [SizeGet, setSizeGet] = useState(null)



const Cart = useSelector((state) => state.addToCart.addToCart);


const handleRemoveCart = (data)=>{
 
dispatch(removeFromCart(data))
}
  return (
<>
{
  Cart.length>0?
  <div className='p-8 relative'>

  <Order  handleRemoveCart={handleRemoveCart}  Cart ={Cart}  />
  
  <div className=' right-16 absolute top-8'>  <CardDetails setSizeGet={setSizeGet} handleRemoveCart={handleRemoveCart} Cart ={Cart}   / ></div>
      </div>  
  :<>
  <div className="flex flex-col items-center  justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  </>
}
</>
    
  )
}

export default Cart
