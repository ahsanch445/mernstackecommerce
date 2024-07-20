import React, { useEffect, useState } from "react";
import Products from "./Product.jsx"; // Ensure this path is correct
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import  {  ToastContainer, toast }from "react-toastify"
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader/Loader.jsx";
import DotLoader from "../DotLoader/DotLoader.jsx";
const CreateProducts = ({ categoryname,isShowCreate, setisShowCreate ,setImageDelUpdate,setisOpenPortalFeatured,isOpenPortalFeatured}) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [Files, setFiles] = useState([]);
  
 const [isLoading, setisLoading] = useState(false)

  const [productData, setproductData] = useState({
    productname: "",
    brandname: "",
    categoryname:  "",
    sectionname:  "",
    itemsname:"",
    descripsion:"",
    price:"",
    selling_price:""
  });


//filter sectionname
let filteredcategory = categoryname?.filter((elem)=>elem.Categoryname.includes(productData?.categoryname))


//filter itemsname
let filtersection
if (filteredcategory && filteredcategory.length > 0) {
  filtersection = filteredcategory[0]?.sections?.filter((elem) => {
    return elem.name.includes(productData?.sectionname);
  });
}



  // const handleCatgeoryProduct = ()=>{
  //  if(isOpenPortalFeatured){
  //   setisOpenPortalFeatured(false)
  //  }
  //   setIsPortalOpen(false)
  // }
  const handalImages = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles.map((file, index) => ({ id: Date.now() + index, file })),
    ]);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imageUrls]);
  };

  const handalProduct = (e) => {
    
    const { name, value } = e.target;
  setproductData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  };

  const AddProduct = async () => {
    setisLoading(true)
    let formData = new FormData();
    for (let i = 0; i < Files.length; i++) {
      formData.append("images", Files[i].file);
      console.log(Files[i].file)
    }
    
    formData.append("productname", productData.productname);
    formData.append("brandname", productData.brandname);
    formData.append("categoryname", productData.categoryname);
    formData.append("descripsion", productData.descripsion);
    formData.append("price", productData.price);
    formData.append("selling_price", productData.selling_price);
    formData.append("isFeatrued", isOpenPortalFeatured);
    formData.append("sectionname", productData.sectionname);
    formData.append("itemsname", productData.itemsname);

    try {
      let res = await axios.post(
        "http://localhost:3000/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
     
      if(res?.data?.success == true){
        if(!isOpenPortalFeatured){
           setImageDelUpdate((e)=>!e)
        }
        imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        setFiles([]);
        setImagePreviews([]);
        setproductData({
          productname: "",
          brandname: "",
          categoryname:  "",
          descripsion:"",
          price:"",
          selling_price:""
        });
        toast.success(res.data.message)
        setisLoading(false)
      }
     

    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.error("Error uploading product:", error);
      setisLoading(false)
    }

    // Clean up image URLs
   
  };

  const handleImageClick = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  if (!isShowCreate) return null

  return (
    <>
 {
  isOpenPortalFeatured&&(
    <div>
      <ToastContainer/>
   

 
    </div>
  )
 }
      <div className="flex justify-center items-center fixed z-40 left-[35vw] top-16">
     
        <div className="w-[450px] h-[100vh] bg-[#ffff] overflow-y-scroll p-5">
    {isOpenPortalFeatured?
     <span className=" w-full flex justify-end cursor-pointer " 
     onClick={()=>{
      setisShowCreate(false)
     }}>
       <CloseIcon/></span>
    : <span className=" w-full flex justify-end cursor-pointer " 
    onClick={()=>setisShowCreate(false)}>
      <CloseIcon/></span>}
          <div>
            <h1 className="font-bold">Upload Product</h1>
          </div>
      <div>
     {
      isLoading? <Loader/>:""
     }
      </div>
          <div className="flex flex-col mt-3">
            <label>Product Name:</label>
            <input
              name="productname"
              value={productData.productname}
              onChange={handalProduct}
              className="bg-gray-200 p-2 rounded-md outline-none"
              type="text"
              placeholder="Enter Product Name"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label>Brand Name:</label>
            <input
              onChange={handalProduct}
              name="brandname"
              required
              value={productData.brandname}
              className="bg-gray-200 p-2 rounded-md outline-none"
              type="text"
              placeholder="Enter Brand Name"
            />
          </div>

        
          <div className="flex flex-col mt-3">
         
            <label>Category Name:</label>
            <select
            name="categoryname"
              onChange={handalProduct}
              value={productData.categoryname}
              className="bg-gray-200 p-2 rounded-md outline-none"
            >
            <option >Select Category</option>
              {categoryname.map((product) => (
                <option  key={product.Categoryname} value={product.Categoryname}>
           {product.Categoryname}
                </option>
              ))}
            </select>
          </div>


          <div className="flex flex-col mt-3">
            <label>Section Name:</label>
            <select
            name="sectionname"
              onChange={handalProduct}
              value={productData.sectionname}
              className="bg-gray-200 p-2 rounded-md outline-none"
            >
            <option >Select Section</option>
              {filteredcategory[0]?.sections?.map((product1,index) => (
                <option  key={index+1} value={product1.name}>
           {product1.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mt-3">
            <label>Items Name:</label>
            <select
            name="itemsname"
              onChange={handalProduct}
              value={productData.itemsname}
              className="bg-gray-200 p-2 rounded-md outline-none"
            >
            <option >Select Items</option>
              {filtersection && filtersection[0]?.items?.map((product1,index) => (
                <option  key={index+1} value={product1.name}>
           {product1.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mt-3">
            <label>Descripsion:</label>
            <textarea
              onChange={handalProduct}
              name="descripsion"
              value={productData.descripsion}
              className="bg-gray-200 resize-none p-2 rounded-md outline-none"
              type="text"
              placeholder="Enter Your Product Descripsion"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label>Price</label>
            <input
              onChange={handalProduct}
              name="price"
              value={productData.price}
              className="bg-gray-200 resize-none p-2 rounded-md outline-none"
              type="number"
              placeholder="Enter Your Product Price"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label>Selling_price</label>
            <input
              onChange={handalProduct}
              name="selling_price"
              
              value={productData.selling_price}
              className="bg-gray-200 resize-none p-2 rounded-md outline-none"
              type="number"
              placeholder="Enter Your Product Selling Price"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label>Uploads Images:</label>
            <div className="bg-gray-200 min-h-60 overflow-hidden p-2 rounded-md">
              <div className="flex flex-col mt-8 justify-center items-center">
                <label htmlFor="inp">
                  <span>
                    <CloudUploadIcon
                      style={{ fontSize: "3vw", cursor: "pointer" }}
                    />
                  </span>
                </label>
                <p className="text-xs font-semibold">Uploads A Images</p>
              </div>
              <input
                onChange={handalImages}
                className="hidden"
                id="inp"
                type="file"
                accept="image/*"
                multiple
              />
              <div className="mt-3 flex gap-3 flex-wrap ">
                {imagePreviews.map((src, index) => (
                  <div key={index+1} className=" bg-slate-300 rounded-md   group flex justify-center items-center   relative">
                    <span>
                      {" "}
                      <DeleteIcon
                        onClick={() => handleImageClick(index)}
                        className=" hidden absolute cursor-pointer group-hover:block h-full left-[0px] bg-red-500 p-1  text-white rounded-full   bottom-0"
                        style={{ height: "1.7vw", width:"1.7vw",}}
                      />
                    </span>
                    <img
                      
                      className="h-20 rounded-md"
                      src={src}
                      alt={`Preview ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-16 mt-3 flex justify-center">
              <button
                className="bg-blue-700 text-white px-5 py-2 text-lg font-semibold rounded-md"
                onClick={AddProduct}
              >
                {
                  isLoading?<DotLoader/>:"Upload Product"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProducts;
