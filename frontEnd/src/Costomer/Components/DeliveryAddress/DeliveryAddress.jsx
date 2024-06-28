import React from 'react'
import DeliveryAddressForm from './DeliveryAddressForm'
import DeliveryAddressdata from './DeliveryAddressdata'

const DeliveryAddress = () => {
  return (
    <div className='p-5 flex justify-between '>
<DeliveryAddressdata/>


<DeliveryAddressForm/>


    </div>
  )
}

export default DeliveryAddress
