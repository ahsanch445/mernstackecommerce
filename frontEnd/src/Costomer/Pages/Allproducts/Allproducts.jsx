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
  const [isShowCreate, setisShowCreate] = useState(false)
 const  handleCreateproduct = ()=>{

  setisShowCreate(true)
 }
  const [updateProduct, setupdateProduct] = useState(null);
  const [allProducts, setallProducts] = useState([]);
  const [imageDelUpdate, setImageDelUpdate] = useState(false);
const [CategoryName, setCategoryName] = useState([])
const [UpdatePortal, setUpdatePortal] = useState(false)

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
   console.log(res.data.message)
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
  <ToastContainer/>
      <div className='w-full'>
        <div className='flex justify-between items-center p-5 w-full bg-slate-00'>
          <p>All Products</p>
          <button onClick={()=>{
            handleCreateproduct()
            setUpdatePortal(false)
          }} className='p-2 bg-blue-600 text-sm tracking-tight font-semibold hover:bg-blue-700 rounded-md text-white'>Upload Product</button>
        </div>
        <div className='flex w-full flex-wrap px-12   p-2 gap-12'>
          {allProducts.map((product, index) => (
            <div className='bg-slate-200 flex justify-center rounded-md '>
              <div key={index} className='max-h-64  max-w-52  px-4  p-2     group'>
             <div className='flex justify-center'>
             <img className='object-cover w-full flex justify-center object-top rounded-md h-[170px]' width={120} src={product?.productimage[0]} alt="product" />
             </div>
              <h1 className='w-fit mt-1 font-medium'>{product.productname}</h1>
              
            <div className='flex py-2 max-h-10 mt-2'>
            <div className=' hidden group-hover:block   hover:flex hover:items-center hover:justify-center text-red-400 cursor-pointer '>
              <DeleteIcon className='bg-white rounded-full p-1' style={{height:"27px" , width:"27px"}}  onClick={ ()=>deleteProduct(product)} /></div>
              <span onClick={() => {
                 openPortalUpdate(product)
                setIsPortalOpen(true)
                setUpdatePortal(true)
                }} className='w-full   flex justify-end cursor-pointer'>
                <EditIcon    style={{height:"27px",width:"27px"}}  className='bg-green-400  hover:bg-green-500  text-white p-1 rounded-full ' />
              </span>
            </div>
            </div>
            </div>
          ))}
        </div>
        <CreateProducts isShowCreate={isShowCreate} setisShowCreate={setisShowCreate} categoryname ={CategoryName}  setIsPortalOpen={ setIsPortalOpen} setImageDelUpdate={setImageDelUpdate} />
      </div>
    {
      UpdatePortal?<>
        <UpdateProduct close={closePortal} categoryname={CategoryName} imageDel={openPortalUpdate} product={updateProduct}  handleImageClick3={ handleImageClick3} open={isPortalOpen} setimageDelUpdate={setImageDelUpdate} />
      </>:""
    }
    </>
  );
};

export default Allproducts;
