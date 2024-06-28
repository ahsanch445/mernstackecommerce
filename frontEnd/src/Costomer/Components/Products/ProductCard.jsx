import React from 'react'
import "./Product.css"
import { useNavigate } from 'react-router-dom'

const ProductCard = ({data}) => {
    const Navigate =useNavigate()
    return (
        <div onClick={()=>{
            Navigate(`/product/${5}`)
          }} class="wrapper py-5 cursor-pointer">
        <div class="container">
            <img className='h-full rounded-lg w-full object-cover object-top' src={data.image} alt="" srcset="" />
       
            <div className='mt-3 text text-[#303030] '>
     <p className=' tracking-tight font-bold' >{data.brand}</p>
     <p className='leading-[1.2] font-normal tracking-tighter opacity-80' >{data.title}</p>

    </div>
    <div className='flex gap-1 mt-1 text-[1.5vw] text text-[#303030] '>
        <p className='font-bold' >{data.selling_price}</p>
        <p className='line-through opacity-70'> {data.price}</p>
        <p  className='text-green-600 tracking-tighter '>{data.disscount}</p>
    </div>
    <div>

    </div>
        </div>
       
         
        
        </div>
    


    )
}

export default ProductCard
