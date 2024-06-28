import React from 'react'

const Filter = () => {
  return (
    <>
    <div className='box w-56 p-4'>
      <div>
      <h1 className='font-semibold'>Filter</h1>
      </div>
    <div>
        <h1 className='font-semibold text-sm tracking-tight mt-3'>ORDER STATUS</h1>
<div className='flex items-center text-sm gap-2 mt-2'>
<input type="checkbox" />
<p>        On The Way</p>
</div>
<div className='flex items-center text-sm gap-2 mt-2'>
<input type="checkbox" />
<p>Delivered</p>
</div>
<div className='flex items-center text-sm gap-2 mt-2'>
<input type="checkbox" />
<p>Cancelled</p>
</div>
<div className='flex items-center text-sm gap-2 mt-2'>
<input type="checkbox" />
<p>Returned</p>
</div>
    </div>
    </div>
    </>
  )
}

export default Filter
