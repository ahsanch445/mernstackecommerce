import React from 'react'
import Filter from './OrderFilter/Filter'
import OrderData from './OrderDetail/Order.data'

const OrderDetail = () => {
  return (
    <div className='p-4 relative justify-between'>
<Filter/>
<div className='absolute right-5 top-0 w-[70%] '>
<OrderData/>


</div>

    </div>
  )
}

export default OrderDetail
