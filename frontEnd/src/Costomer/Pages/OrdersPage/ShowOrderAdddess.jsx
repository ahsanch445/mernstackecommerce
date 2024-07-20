import React, { useState } from 'react'

const ShowOrderAdddess = ({AddressData}) => {
    
    
  return (
  


          <div className='w-72   px-4 '>
<div>
<h1 className='font-semibold'>{AddressData.fullName}</h1>
<p className='leading-[1.2] font-medium opacity-85 text-[15px]'>
{AddressData.email}
</p>
<p className='leading-[1.2] font-medium opacity-85 text-[15px]'>
{AddressData.line1}
</p>
<p className='leading-[1.2] font-medium opacity-85 text-[15px]'>
{AddressData.line2}
</p>


    <p className='font-medium opacity-85  text-[15px]'>{AddressData?AddressData?.PhoneNumber:"030000000000"}</p>
    <h1 className='font-semibold tracking-tight '> {AddressData.postal_code}</h1>
</div>
<br />
<hr />



    </div>
 
   
  )
}

export default ShowOrderAdddess