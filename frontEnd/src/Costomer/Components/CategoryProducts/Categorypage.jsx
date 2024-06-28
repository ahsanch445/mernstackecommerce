

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import CategoryProducts from './CategoryProducts';
import axios from 'axios';

const Categorypage = () => {
    let params = useParams();
    const [showCat, setshowCat] = useState([]);

  const handalCategoryProduct = async () => {
  
    
    try {
      let response = await axios.post(
        `http://localhost:3000/product/${params.categoryname}/${params.sectionname}/${params.itemsname}`
      );
      setshowCat(response?.data?.product);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handalCategoryProduct();
  }, [params]);
  
  return (
   <div className='flex '>
   {
    showCat.map((elem,index)=><CategoryProducts true1 ={true}  key={index} data={elem}/> )
   }
   
   </div>
  )
}

export default Categorypage