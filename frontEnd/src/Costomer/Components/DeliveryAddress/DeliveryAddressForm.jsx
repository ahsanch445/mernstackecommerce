import React, { useState } from 'react'

const DeliveryAddressForm = ({AddressData,setAddressData}) => {
   
  
    const handalChage = (e)=>{
        setAddressData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }


  return (
    <>
    <div className='box w-[63%] p-3 '>
<div className=' flex justify-between'>
<input value={AddressData?.FirstName} style={{border:"1px gray solid"}} onChange={handalChage} name='FirstName'  placeholder='First Name*'  className='p-1 rounded w-[25vw] outline-none ' type="text"  />
<input value={AddressData?.LastName} style={{border:"1px gray solid"}} onChange={handalChage} name='LastName' placeholder='Last Name*'  className='p-1 rounded w-[25vw] outline-none ' type="text"  />
</div>


<div className=' flex justify-between mt-3'>
<textarea value={AddressData?.Address} style={{border:"1px gray solid"}} onChange={handalChage} name='Address' placeholder='Address*'   className='p-1 rounded w-full outline-none ' type="text"  />

</div>
<div className=' flex justify-between mt-3'>
<input value={AddressData?.City}  style={{border:"1px gray solid"}} onChange={handalChage} name='City' placeholder='City*'  className='p-1 rounded w-[25vw] outline-none ' type="text"  />
<input style={{border:"1px gray solid"}} onChange={handalChage} name='State' placeholder='State/Province/Region*'  className='p-1 rounded w-[25vw] outline-none ' type="text"  />
</div>
<div className=' flex justify-between mt-3'>
<input value={AddressData?.Zip}  style={{border:"1px gray solid"}} onChange={handalChage} name='Zip' placeholder='Zip/Postal code*'  className='p-1 rounded w-[25vw] outline-none ' type="text"  />
<input value={AddressData?.PhoneNumber} style={{border:"1px gray solid"}} onChange={handalChage} name='PhoneNumber' placeholder='Phone Number*'  className='p-1 rounded w-[25vw] outline-none ' type="text"  />
</div>
<button onClick={()=>setAddressData({
    ...AddressData,
    showData :true
})} className='bg-[#3c47d8] p-2 mt-3 text-sm rounded text-[white] '>DELIVERD HERE</button>
</div>
    </>
  )
}

export default DeliveryAddressForm
