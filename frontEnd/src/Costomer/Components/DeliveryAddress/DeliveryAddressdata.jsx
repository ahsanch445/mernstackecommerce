import React from 'react'

const DeliveryAddressdata = ({OrderSummary,hide}) => {
    console.log(hide)
  return (
    <div>
          <div className='w-72 border box py-6 px-4 '>
<div>
<h1 className='font-semibold'>Ahsan ch</h1>
<p className='leading-[1.2] font-medium opacity-85 text-[15px]'>Punjab,Bahwalnagar,Star City Street no.2 hosue no.5</p>
<h1 className='font-semibold tracking-tight mt-3'>Phone Number</h1>
    <p className='font-medium opacity-85  text-[15px]'>03046633523</p>
    {!hide||OrderSummary?<button className='bg-[#3c47d8] p-2 mt-3 text-sm rounded text-[white] '>DELIVERD HERE</button>:""}
</div>
<br />
<hr />
<br />


    </div>
    </div>
  )
}

export default DeliveryAddressdata
