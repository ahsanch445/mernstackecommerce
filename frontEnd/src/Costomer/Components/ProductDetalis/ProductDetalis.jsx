import React, { useContext, useEffect, useState,useRef } from 'react'
import "./Product.css"

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Grid } from '@mui/material';
import Ratting from '../RattingCard/Ratting';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartQtn, setAddToCart } from '../../../Store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetalis = () => {
  

  const [isSize, setisSize] = useState("S")
  const [isProductDetails, setisProductDetails] = useState(false)
  const handleSize=(e)=>{
    setisSize(e.target.value)

  }
  let navigate = useNavigate()
    const location = useLocation();
    let dispatch = useDispatch()
   
  const { product } = location.state || {};
 
  
  const [imgUrl, setimgUrl] = useState()
const [orderQtn, setorderQtn] = useState(1)

const handleCartQtn = (id,data)=>{
  setorderQtn(data)
  dispatch(CartQtn({productId:id,data}))
}


const handalImageClik =(image)=>{
    setimgUrl(image)

}
useEffect(() => {
    window.scrollTo(0, 0);
    setisProductDetails(true)
  }, []);
const [zoom, setZoom] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 });
const imgRef = useRef(null);

const handleMouseMove = (e) => {
  const { left, top, width, height } = imgRef.current.getBoundingClientRect();
  const x = ((e.pageX - left) / width) * 100;
  const y = ((e.pageY - top) / height) * 100;
  setPosition({ x, y });
};

const handleMouseEnter = () => {
  setZoom(true);
};

const handleMouseLeave = () => {
  setZoom(false);
};


  return (
    <div>
      <section  id="product-info">

<div className="item-image-parent">
    <div className="item-list-vertical">
       {
        product?.productimage?.map(( image,index)=>{
            return(
                <div className="thumb-box">
                <img key={index+1} onClick={()=>handalImageClik(image)} src={image} alt="thumbnail" />
            </div>
            )
        })
       }
      

    </div>
    <div className="item-image-main main-container  bg-white">
<div className='image-con'>
{
    !imgUrl?<img 
    
    onMouseMove={handleMouseMove}
    ref={imgRef}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} className=' cursor-pointer max-h-64 rounded-md object-top max-w-54' src= {product?.productimage[0]} alt="default" />:
    
    <img
    ref={imgRef}
    onMouseMove={handleMouseMove}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
     className=' max-h-64 rounded-md object-top cursor-pointer max-w-64' src= {imgUrl} alt="default" />
}
<div style={{pointerEvents:"none"}} className=' absolute h-80 right-10 w-2/4 top-28 z-10'>
{zoom && (
       <>
       {
        imgUrl?<div
        
        className="zoomed-image  bg-slate-600 h-full"
        style={{
         
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: `${position.x}% ${position.y}%`,
        }}
      ></div>:<div
      className="zoomed-image  bg-slate-600 h-full"
      style={{
       
        backgroundImage: `url(${product?.productimage[0]})`,
        backgroundPosition: `${position.x}% ${position.y}%`,
      }}
    ></div>
       }
       </>
      )}
</div>
</div>
    </div>
</div>

<div className="item-info-parent">
   
    <div className="main-info">
        <h4>{product?.productname}</h4>
        <div className="star-rating">
            <span>★★★★</span>★            
        </div>
        <p style={{fontSize:"19px"}} >Price: <span id="price">Rs{product?.selling_price}</span> <span className='  line-through' id="price1">{product?.price}</span> </p>
        <p>
    Discount : {
     Math.floor( product?.discountParacentage)
      
    }
     <span>
%
    </span>
   </p>
        <h2>Brand name: {product?.brandname}</h2>
  
    </div>
  





    <div className="select-items">
        
        <div className="change-color  flex">
        <div>
        <div className="change-size">
            <label><b>Size:</b></label><br/>
            <select onChange={handleSize} className=' bg-gray-200'>
           {product?.Size?.map((elem,index)=>{
            return(
             
              <option key={index+1}>{elem}</option>
              
         
            )
           })}
            </select>
        </div>
            

        </div>
<div className='flex justify-center items-center ml-24'>

<button onClick={()=>{
    navigate(`/Checkout/${5}`)
     dispatch(setAddToCart({isProductDetails:true,product,isSize}))
}} class="addtocart">
  <div class="pretext gap-2">
 <AddShoppingCartIcon/>   <p>Add To Cart</p>
  </div>
  
  
  
</button>
            
</div>
        </div>
        
       <div style={{userSelect:"none"}} className='flex   items-center gap-2'>
        <h1 className='text-gray-700'>Quantity:</h1>
        <h1  onClick={()=>handleCartQtn(product._id,orderQtn-1)} className=' px-2 cursor-pointer max-h-7 flex justify-center items-center max-w-7  text-xl font-bold bg-gray-200 hover:bg-slate-300'>- </h1>
        <h1>{orderQtn}</h1>
        <h1  onClick={()=>handleCartQtn(product._id,orderQtn+1)} className='px-2 cursor-pointer max-h-7 flex justify-center items-center max-w-7  text-xl font-bold bg-gray-200 hover:bg-slate-300'>+</h1>
       </div>

        <div className="description  mt-7">
          {
            product?.descripsion?
            <p > <span className='font-semibold opacity-60'>Description : </span>{product?.descripsion} </p>
            :""
          }
        </div>
    </div>
   
</div>
</section>

{/* { Ratting} */}
<section>
<h1 className='font-semiblod text-lg  p-2 w-full'>
    Recent Ratting & Reviews
</h1>
    <Grid container >
        <div  className=' border p-5 w-full'>
            <Grid className='space-y-5 w-full'>
<Ratting/>
            </Grid>

        </div>

    </Grid>
</section>
    </div>
  )
}

export default ProductDetalis
