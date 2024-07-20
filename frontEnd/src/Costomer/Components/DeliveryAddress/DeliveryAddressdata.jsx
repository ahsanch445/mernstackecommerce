import React from 'react'
import StripePaymentForm from '../Stripe/Stripe'
import { useSelector } from 'react-redux'
const DeliveryAddressdata = ({OrderSummary,hide,AddressData}) => {
 

  
  return (
    <div>
          <div className='w-72 border box py-6 px-4 '>
<div>
<h1 className='font-semibold'>{AddressData.showData?`${AddressData?.FirstName} ${AddressData?.LastName}`:"Muhammad Ahsan"}</h1>
<p className='leading-[1.2] font-medium opacity-85 text-[15px]'>
  {AddressData.showData ? `${AddressData.State}, ${AddressData.City} , ${AddressData.Address}` : "Punjab, Bahawalnagar, Star City Street no.2 house no.5"}
</p>

<h1 className='font-semibold tracking-tight mt-1'>{AddressData.showData?AddressData?.Zip:"61200"}</h1>
    <p className='font-medium opacity-85  text-[15px]'>{AddressData.showData?AddressData?.PhoneNumber:"030000000000"}</p>
    {!hide||OrderSummary?<button className='bg-[#3c47d8] p-2 mt-3 text-sm rounded text-[white] '>
      <StripePaymentForm AddressData={AddressData}  />

      
      </button>:""}
</div>
<br />
<hr />
<br />


    </div>
    </div>
  )
}

export default DeliveryAddressdata
