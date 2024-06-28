import React, { useEffect, useState } from "react";
import Products from "../CreateProduct/Product"; // Ensure this path is correct
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader"
const UpdateProduct = ({
  categoryname,
  close,
  open,
  product,
  setimageDelUpdate,
  handleImageClick3,
  
}) => {
  if (!open) return null;
  const [productData, setproductData] = useState({
    productname: product?.productname || "",
    brandname: product?.brandname || "",
    categoryname: product?.Categoryname || "",
    itemsname: product?.item || "",
    sectionname: product?.sections || "",
    descripsion: product?.descripsion || "",
    price: product?.price || "",
    selling_price: product?.selling_price || "",
  });


  let combain = [];

  let filteredcategory = categoryname?.filter((elem)=>elem.Categoryname.includes(productData?.categoryname))
let awssection= filteredcategory[0]?.sections[0]?.items?.map((elem)=>{
return elem.name
})
console.log("the first",awssection)
  let sections = filteredcategory[0]?.sections?.items?.map((elem)=>{
return elem.name
  })
  console.log(sections)
  const [isLoading, setisLoading] = useState(false)

  const [imagePreviews, setImagePreviews] = useState([]);
 

  const [DeleteImages, setDeleteImages] = useState({
    id: product?._id,
    url: "",
  });
  const [Files, setFiles] = useState([]);

  
  
   

    


 

//show image in image tag
  const handalImages = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles.map((file, index) => ({ id: Date.now() + index, file })),
    ]);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imageUrls]);
  };
  //combain data for map 

 combain = [...imagePreviews, ...(Array.isArray(product?.productimage) ? product.productimage : [])];
//create product details
  const handalProduct = (e) => {
    
    let { name, value } = e.target;
    setproductData({
      ...productData,
      [name]: value,
     
    });
  };

  



//delete image from preivew
  const handleImageClick = (index) => {

    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

//delete image from backend logic
  const handleImageClick2 = async (elem) => {
  
    let data = elem.split(":");
    if (data[0] == "blob") return null;
    else {
     

      try {
        let res = await axios.post(
          "http://localhost:3000/product/delete",
          {
            
            id:product._id,
            url:elem 

          }
        );
       
        if (res.data.success) {
         
          setimageDelUpdate((p) => !p);
        }
      } catch (error) {
        console.error("Error deleting images:", error.message);
      }
    }
  };

  //update product other data

  const productUpdate = async () => {
    setisLoading(true)
    const formData = new FormData();

    for (let i = 0; i < Files.length; i++) {
      formData.append("images", Files[i].file);
    }
    formData.append("productname", productData.productname);
    formData.append("brandname", productData.brandname);
    formData.append("categoryname", productData.categoryname);
    formData.append("descripsion", productData.descripsion);
    formData.append("price", productData.price);
    formData.append("selling_price", productData.selling_price);
    formData.append("itemsname", productData.itemsname);
    formData.append("sectionname", productData?.sectionname);

    try {
      let res = await axios.post(
        `http://localhost:3000/product/update/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
     
        
      if (res.data.success) {
      
        setisLoading(false)
        setimageDelUpdate((e)=>!e)
        setFiles([]);
        setImagePreviews([])
        toast.success(res.data.message)
      }
    } catch (error) {
     
     if( !error.response.data.message =="Server error" ){
      toast.error(error.response.data.message)
     }
      console.error("Error deleting images:", error);
    }
  };

  return (
    <>
    
     <div> 
     <div className="flex justify-center items-center fixed z-40 left-[35vw] mt-16 top-0 ">
        <div className="w-[450px] h-[100vh] bg-[#ffff] overflow-y-scroll p-5">
          <span
            className=" w-full flex justify-end cursor-pointer "
            onClick={close}
           
          >
            {" "}
            <CloseIcon />
          </span>
          <div>
            <h1 className="font-bold">Upload Product</h1>
           
          
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
              value={productData?.categoryname}
              className="bg-gray-200 p-2 rounded-md outline-none"
            >
           
              {categoryname.map((product) => (
                <option selected={  product?.Categoryname} key={product} value={product.CategoryName}>
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
              value={productData?.sectionname}
              className="bg-gray-200 p-2 rounded-md outline-none"
            >
           
              {
              categoryname&&
              categoryname[0]?.sections?.map((product) => (
                <option  key={product} value={product.sectionname}>
               {
              
                  product.name
                 
               }
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-3">
            <label>Items Name:</label>
            <select
            name="itemsname"
              onChange={handalProduct}
              value={productData?.itemsname}
              className="bg-gray-200 p-2 rounded-md outline-none"
            >
           
              {
              
              awssection?.map((product) => (
                <option  key={product} value={product}>
               {
              
                  product
                 
               }
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
                {product
                  ? combain.map((src, index) => (
                      <div className=" bg-slate-300 rounded-md   group flex justify-center items-center   relative">
                        <span>
                          {" "}
                          <DeleteIcon
                            onClick={() => {
                              handleImageClick3(product);
                              handleImageClick2(src);
                              handleImageClick(index);
                            
                            }}
                            className=" hidden  absolute cursor-pointer group-hover:block h-full left-[0px] bg-red-500 p-1  text-white rounded-full   bottom-0"
                            style={{ height: "1.7vw", width: "1.7vw" }}
                          />
                        </span>
                        <img
                          key={index}
                          className="h-20  rounded-md"
                          src={src}
                          alt={`Preview ${index}`}
                        />
                      </div>
                    ))
                  : imagePreviews.map((src, index) => (
                      <div className=" bg-slate-300 rounded-md   group flex justify-center items-center   relative">
                        <span>
                          {" "}
                          <DeleteIcon
                            onClick={() => handleImageClick(index)}
                            className=" hidden absolute cursor-pointer group-hover:block h-full left-[0px] bg-red-500 p-1  text-white rounded-full   bottom-0"
                            style={{ height: "1.7vw", width: "1.7vw" }}
                          />
                        </span>
                        <img
                          key={index}
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
                onClick={productUpdate}
              >
                UpdateProduct
              </button>
            </div>
          </div>
        </div>
      </div>
     </div>
     
    </>
  );
};

export default UpdateProduct;
