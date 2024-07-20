import React, { useState } from 'react';

const Filter = ({selectedStatus,setSelectedStatus}) => {
  

  const handleCheckboxChange = (status) => {
    setSelectedStatus(prevStatus => (prevStatus === status ? '' : status));
  };

  return (
    <div className='box w-56 p-4'>
      <div>
        <h1 className='font-semibold'>Filter</h1>
      </div>
      <div>
        <h1 className='font-semibold text-sm tracking-tight mt-3'>ORDER STATUS</h1>
        <div className='flex items-center text-sm gap-2 mt-2'>
          <input className=' cursor-pointer'
            type="checkbox" 
            checked={selectedStatus === 'Pending'} 
            onChange={() => handleCheckboxChange('Pending')} 
          />
          <p>Pending</p>
        </div>
        <div className='flex items-center text-sm gap-2 mt-2'>
          <input className=' cursor-pointer'
            type="checkbox" 
            checked={selectedStatus === 'Confrimed Order'} 
            onChange={() => handleCheckboxChange('Confrimed Order')} 
          />
          <p>Confrimed Order</p>
        </div>
        <div className='flex items-center text-sm gap-2 mt-2'>
          <input className=' cursor-pointer'
            type="checkbox" 
            checked={selectedStatus === 'Shipped Order'} 
            onChange={() => handleCheckboxChange('Shipped Order')} 
          />
          <p>Shipped Order</p>
        </div>
        <div className='flex items-center text-sm gap-2 mt-2'>
          <input className=' cursor-pointer'
            type="checkbox" 
            checked={selectedStatus === 'Delivered Order'} 
            onChange={() => handleCheckboxChange('Delivered Order')} 
          />
          <p>Delivered Order</p>
        </div>
      </div>
    </div>
  );
}

export default Filter;
