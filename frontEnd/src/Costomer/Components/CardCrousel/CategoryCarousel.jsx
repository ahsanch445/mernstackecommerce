import React, { useState, useEffect, useContext } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../HomeCard/Card";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { KurtaData } from "../../Data/KurtaData";
import axios from 'axios';
import CategoryProducts from '../CategoryProducts/CategoryProducts';
import { toastContext } from '../../../Context-Api/Context';

const CategoryCarousel = (props) => {

 
 
const [product, setCateProduct] = useState([])
let {search}=useContext(toastContext)

let filterCateProduct = product.filter((data)=>{
  return(
    data.Categoryname.includes(props.category.Categoryname)
  )
})
let data = filterCateProduct.filter((item) => item?.productname.toLowerCase().includes(search?.toLowerCase()));

console.log(data)
const sendDataToBackend = async () => {
  
  
  try {
    const response = await axios.get(`https://ecommerce-api-one-iota.vercel.app/product/products`);
    setCateProduct(response.data)
   
  } catch (error) {
    console.error('Error sending data to backend:', error);
    }
  };
  useEffect(() => {
    
     
    
        
          sendDataToBackend();
    
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };



 

  const CustomNextButton = ({ onClick }) => (
   <>
   
    <button onClick={onClick} className="md:hidden absolute bg-white shadow-2xl right-[0px] z-10 custom-next-button">
      <ArrowForwardIosIcon />
    </button>
   </>
  );

  const CustomPrevButton = ({ onClick }) => (
    <button onClick={onClick} className=" md:hidden absolute     left-0  bg-white shadow-2xl  mr-10 z-20 custom-next-button">
      <ArrowBackIosIcon />
    </button>
  );

  return (
    <>
      <div  style={{ border: "2px #bebaba88 solid " }} >
       {filterCateProduct.length>0? <h1 className='m-2 font-bold text-lg'>Top {props?.category?.Categoryname} Items</h1>:""}
     
        <div className="relative ">
          <Carousel
         
            responsive={responsive}
            customRightArrow={<CustomNextButton />}
            customLeftArrow={<CustomPrevButton />}
          >
        
     
      
       {data?.map((e, index) => (
              <CategoryProducts key={index} data={e} />
            ))}
     
    
    
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CategoryCarousel;
