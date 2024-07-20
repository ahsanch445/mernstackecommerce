import React from 'react'
import './style.css'
const Loader = () => {
  return (
 <div className=' absolute z-10 top-48 left-48'>
       <div className="loader  ">
  <div className="circle"></div>
  <div className="circle"></div>
  <div className="circle"></div>
</div>
 </div>
  )
}

export default Loader