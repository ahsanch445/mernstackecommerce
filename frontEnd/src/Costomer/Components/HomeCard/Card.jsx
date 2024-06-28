import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

const Card = ({data}) => {

  let navigate= useNavigate()
  const handalClick = ()=>{


navigate(`/product/${5}`)

  }
  return (
 <div className='flex justify-center'>

<div onClick={handalClick} className='border cursor-pointer border-gray-300 border-solid border-2 flex flex-wrap rounded-lg px-4 pt-2 shadow-lg   w-[10rem] '>
      <div className='h-[9rem] w-full '>
        <img className='w-full h-full rounded-md object-cover object-top' src={data.image} alt="" srcset="" />
      </div>
   <div className=''>

   <h3  className='tracking-tight font-bold px-1 mt-1 text-[#383737] '>{data.brand}</h3>
<p style={{opacity:"0.8",fontFamily:"arial"}} className='leading-[1.1] px-1 mb-3  flex justify-center text-[1.4vw] tracking-tighter'>{data.title}   </p>
   </div>
    </div>

 </div>
  )
}

export default Card
