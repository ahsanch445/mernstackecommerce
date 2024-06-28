import React, { useState } from 'react'
import DeliveryAddressdata from '../DeliveryAddress/DeliveryAddressdata'
import OrderSteper from "./OrderStepper"
import PlacedDetails from './PlacedDetails'
const OrderPlaced = () => {
let hide = true
  return (
   <>
    <div className='p-7 w-full'>
      <DeliveryAddressdata hide={hide}/>
      <OrderSteper/>
    
    </div>
 <div className='px-7 py-2'>
     <PlacedDetails/>
     <PlacedDetails/>
     <PlacedDetails/>
     <PlacedDetails/>
     <PlacedDetails/>
     
     </div>
   </>
  )
}

export default OrderPlaced
