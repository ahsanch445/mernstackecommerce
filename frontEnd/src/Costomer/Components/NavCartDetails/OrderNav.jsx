import React from 'react'

const OrderNav = () => {
  return (
 
        <div>
           <div className='box w-[55%] h-44 p-3 '>
         <div className='h-3/4 flex gap-2 '>
            <img className='h-full w-[10vw] object-cover rounded ' src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="" />
    <div>
        <p className='tracking-tighter font-semibold'>Mens Slim Mid Rise Black</p>
        <p className='tracking-tighter opacity-85'>Size : L</p>
        <p className='tracking-tighter opacity-85'>Seller: ahsan</p>
        <div className='flex gap-1'>
        <p className='line-through opacity-70'>2000</p>
    <p className='font-semibold' >Rs200</p>
    <p  className='text-green-600 tracking-tighter text-[1.7vw] '>90% off</p>
    </div>
    
    </div>
    
    
         </div>
         {/* add button increase and descrease */}
     <div className='flex gap-8 items-center'>
    
     <div class="quantity-field mt-1 pl-1" >
      <button 
        class="value-button decrease-button" 
        onclick="decreaseValue(this)" 
        title="Azalt">-</button>
        <div class="number">0</div>
      <button 
        class="value-button increase-button" 
        onclick="increaseValue(this, 5)"
        title="Arrtır"
      >+
      </button>
    
    
    </div>
    <p className='text-[#5e53ff] text-sm cursor-pointer'>Remove</p>
     </div>
          </div>
    
        </div>
    

    
  )
}

export default OrderNav