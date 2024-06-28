import React, { useState } from 'react'

import DeliveryAddressdata from '../DeliveryAddress/DeliveryAddressdata'
import Cart from '../Cart/Cart'

const OrderSummary = () => {
    const [OrderSummary, setOrderSummary] = useState(true)
  return (
    <>
    <div className='mb-16'>
    <DeliveryAddressdata OrderSummary={OrderSummary}/>
      <Cart/>
    </div>
    </>
  )
}

export default OrderSummary
