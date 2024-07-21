
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CreateProducts from "../CreateProduct/CreateProducts";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader/Loader";
import DotLoader from "../DotLoader/DotLoader";
const CreateCategory = ({ isPortalOpen, setisPortalOpen }) => {
  if (!isPortalOpen) return null;
  const [Categoryname, setCategoryname] = useState("");
const [successMessage, setsuccessMessage] = useState(null)
  
const [isOpenPortalFeatured, setisOpenPortalFeatured] = useState(false)
 const [isLoading, setisLoading] = useState(false)
  const [section, setsection] = useState({
    sectionname: "",
    itemsname: "",
  });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setsuccessMessage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  

  const handalCategory = (e) => {
    let { name, value } = e.target;

    setsection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handalCilckCategory = async () => {
    setisLoading(true)
    try {
      let res = await axios.post("http://localhost:3000/categories/create", {
        section,
        Categoryname,
      });
      
    toast.success(res?.data?.message)
     setCategoryname("")
     setsection({
      sectionname:"",
      itemsname:""
     })
     setisLoading(false)
    } catch (error) {
    
      console.error(error);
      setsuccessMessage(error?.response?.data?.message)
      setisLoading(false)
    }
  };
  const handleFeaturedProduct = ()=>{
    setisOpenPortalFeatured(true)
  }

  return (
    <>
    <ToastContainer/> 
      <div className="flex justify-center items-center fixed z-40 left-[35vw] top-16">
        <div className="w-[450px] h-[100vh] bg-[#ffff] overflow-y-scroll p-5">
        {
          successMessage?<>
          <h1 className=" flex justify-center items-center font-semibold text-red-500">{successMessage}</h1>
          </>:""
        }
          <span
            className=" w-full flex justify-end cursor-pointer "
            onClick={() => setisPortalOpen(false)}
          >
            {" "}
            <CloseIcon/>
          </span>
          <div>
            <h1 className="font-bold">Create Category</h1>
          </div>
          <div>
            {
              isLoading?<>
              <Loader/>
              </>:""
            }
          </div>
          <div className="flex flex-col mt-3">
            <label>Category Name:</label>
            <input
              onChange={(e) => setCategoryname(e.target.value)}
              name="categoryname"
              value={Categoryname}
              className="bg-gray-200 p-2 rounded-md outline-none"
              type="text"
              placeholder="Enter Category Name"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label>Section Name:</label>
            <input
              onChange={handalCategory}
              name="sectionname"
              value={section?.sectionname}
              className="bg-gray-200 p-2 rounded-md outline-none"
              type="text"
              placeholder="Enter Section Name"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label>Item Name:</label>
            <input
              onChange={handalCategory}
              name="itemsname"
              value={section.itemsname}
              className="bg-gray-200 p-2 rounded-md outline-none"
              type="text"
              placeholder="Enter Item Name"
            />
          </div>

          <div className="w-full flex justify-center">
            <button onClick={handleFeaturedProduct} className="bg-blue-700    mt-6 text-white px-10 py-2 text-lg font-semibold rounded-md">
              Add Featured Product
            </button>
          </div>
          <div >
    <CreateProducts isOpenPortalFeatured={ isOpenPortalFeatured} setisOpenPortalFeatured= {setisOpenPortalFeatured}/>
    </div>
          <div className="flex flex-col mt-3">
            <div className="mb-16 mt-3 flex justify-center">
              <button
                onClick={handalCilckCategory}
                className="bg-blue-700 text-white px-5 py-2 w-2/3 text-lg font-semibold rounded-md"
                //  onClick={AddProduct}
              >
             {
              isLoading?<DotLoader/>:"Create Category"
             }
              </button>
            
            </div>
          </div>

          
        </div>
      
      </div>
    </>
  );
};

export default CreateCategory;
