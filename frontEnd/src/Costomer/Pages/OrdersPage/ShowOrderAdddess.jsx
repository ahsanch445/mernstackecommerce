import React, { useState } from 'react'

const ShowOrderAdddess = ({AddressData}) => {
    // const [AddressData, setAddressData] = useState(false)
  return (
  


          <div className='w-72   px-4 '>
<div>
<h1 className='font-semibold'>{AddressData?`${AddressData?.FirstName} ${AddressData?.LastName}`:"Muhammad Ahsan"}</h1>
<p className='leading-[1.2] font-medium opacity-85 text-[15px]'>
  {AddressData ? `${AddressData.State}, ${AddressData.City} , ${AddressData.Address}` : "Punjab, Bahawalnagar, Star City Street no.2 house no.5"}
</p>

<h1 className='font-semibold tracking-tight mt-1'>{AddressData?AddressData?.Zip:"61200"}</h1>
    <p className='font-medium opacity-85  text-[15px]'>{AddressData?AddressData?.PhoneNumber:"030000000000"}</p>
    
</div>
<br />
<hr />



    </div>
 
   
  )
}

export default ShowOrderAdddess