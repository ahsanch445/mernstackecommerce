import React, { useEffect, useState } from 'react';
import CreateProducts from '../../Components/CreateProduct/CreateProducts';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import UpdateProduct from '../../Components/UpdateProduct/UpdateProduct';
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Allproducts = () => {

  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isPortalOpenUpdate, setisPortalOpenUpdate] = useState(false);
  const [updateProduct, setupdateProduct] = useState(null);
  const [allProducts, setallProducts] = useState([]);
  const [imageDelUpdate, setImageDelUpdate] = useState(false);
const [CategoryName, setCategoryName] = useState([])

console.log("gsgygs",CategoryName)
  const getAllProducts = async () => {
    try {
      let res = await axios.get("http://localhost:3000/product/all");
      setallProducts(res.data.allProducts);
    } catch (error) {
      console.error(error.message);
    }
  };

// console.log(categoryData[0].name)

  useEffect(() => {
    getAllProducts();
  }, [imageDelUpdate]);

  const openPortal = () => {
    setIsPortalOpen(true);
  };

  const closePortal = () => {
    
    setIsPortalOpen(false);
  };

  const openPortalUpdate = (product) => {
    
    setupdateProduct(product);
    setisPortalOpenUpdate(true);
  };
  const  handleImageClick3 = (product)=>{
   
    setupdateProduct(product);
  }
console.log("update product",updateProduct)
  
  useEffect(() => {
    if (updateProduct) {
      const updatedProduct1 = allProducts.find(product => product._id === updateProduct._id);
      setupdateProduct(updatedProduct1);
     
    }
  }, [allProducts]);

  const deleteProduct = async(product)=>{
    
   
    try {
     const res =  await axios.post(`http://localhost:3000/product/delete/${product?._id}`)
     setImageDelUpdate((e)=>!e)
   
  toast.success(res?.data?.message)
    } catch (error) {
     console.error(error)
    }
   
   
   }

   //show CategoryName
   const showAllCategoryName = async()=>{
let res = await axios.get("http://localhost:3000/categories/nav/all")

setCategoryName(res?.data?.category)
   }
 useEffect(() => {
  showAllCategoryName()

 }, [])

  
  return (
    <>
  
      <div className='w-full bg-slate-100'>
        <div className='flex justify-between items-center p-5 w-full bg-slate-00'>
          <p>All Products</p>
          <button onClick={openPortal} className='p-2 bg-blue-600 text-sm tracking-tight font-semibold hover:bg-blue-700 rounded-md text-white'>Upload Product</button>
        </div>
        <div className='flex w-full flex-wrap  p-2 gap-9'>
          {allProducts.map((product, index) => (
            <div key={index} className='max-h-64 p-3 bg-slate-200   rounded-md  group'>
              <img className='object-cover object-top rounded-md h-32' width={120} src={product?.productimage[0]} alt="product" />
              <h1 className='w-fit mt-1 font-medium'>{product.productname}</h1>
              
            <div className='flex py-2 max-h-10 mt-2'>
            <div className=' hidden group-hover:block   hover:flex hover:items-center hover:justify-center text-red-400 cursor-pointer '>
              <DeleteIcon className='bg-white rounded-full p-1' style={{height:"27px" , width:"27px"}}  onClick={ ()=>deleteProduct(product)} /></div>
              <span onClick={() => {
                 openPortalUpdate(product)
                setIsPortalOpen(true)}} className='w-full   flex justify-end cursor-pointer'>
                <EditIcon   style={{height:"27px",width:"27px"}}  className='bg-green-400  hover:bg-green-500  text-white p-1 rounded-full ' />
              </span>
            </div>
            </div>
          ))}
        </div>
        <CreateProducts   categoryname ={CategoryName}  setIsPortalOpen={ setIsPortalOpen} setImageDelUpdate={setImageDelUpdate} close={closePortal} open={isPortalOpen} />
      </div>
    {
      !openPortal?<>
        <UpdateProduct close={closePortal} categoryname={CategoryName} imageDel={openPortalUpdate} product={updateProduct}  handleImageClick3={ handleImageClick3} open={isPortalOpen} setimageDelUpdate={setImageDelUpdate} />
      </>:""
    }
    </>
  );
};

export default Allproducts;
