import React, { useState } from 'react'
import DeliveryAddressForm from './DeliveryAddressForm'
import DeliveryAddressdata from './DeliveryAddressdata'

const DeliveryAddress = () => {
  const [AddressData, setAddressData] = useState({
    FirstName:"",
    LastName:"",
    Address:"",
    City:"",
    State:"",
    Zip:"",
    PhoneNumber:"",
    showData:false
})
  return (
    <div className='p-5 flex justify-between '>
<DeliveryAddressdata AddressData={AddressData} />


<DeliveryAddressForm AddressData={AddressData} setAddressData={setAddressData} />


    </div>
  )
}

export default DeliveryAddress
