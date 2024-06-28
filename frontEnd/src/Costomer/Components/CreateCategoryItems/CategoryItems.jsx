
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseIcon from '@material-ui/icons/Close';
import CreateProducts from "../CreateProduct/CreateProducts";
import { ToastContainer, toast } from "react-toastify";
const CategoryItems = ({categoryData, sectionData,isOpenItems, setisOpenItems }) => {
  if (!isOpenItems) return null;
  const [section, setsection] = useState({
    categoryname:"",
    sectionname: "",
    itemsname: "",
  });

const [successMessage, setsuccessMessage] = useState(null)
  console.log(sectionData)
// const [isOpenPortalFeatured, setisOpenPortalFeatured] = useState(false)
 const filterData = categoryData.filter((elem)=>elem.Categoryname.includes(section.categoryname))
let data = filterData[0]

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
    try {
      let res = await axios.post("http://localhost:3000/categories/addnew2", 
        section,
        
      );
      
   
     setsuccessMessage(res?.data?.message)
    
     setsection({
      sectionname:"",
      categoryname:"",
      itemsname:""
     })
    } catch (error) {
    
      console.error(error);
      setsuccessMessage(error?.response?.data?.message)
    }
  };


  return (
    <>
    
      <div className="flex justify-center items-center fixed z-40 left-[35vw] top-16">
        <div className="w-[450px] h-[100vh] bg-[#ffff] overflow-y-scroll p-5">
        {
          successMessage?<>
          <h1 className=" flex justify-center items-center font-semibold text-red-500">{successMessage}</h1>
          </>:""
        }
          <span
            className=" w-full flex justify-end cursor-pointer "
            onClick={() => setisOpenItems(false)}
          >
            {" "}
            <CloseIcon/>
          </span>
          <div>
            <h1 className="font-bold">Create Category</h1>
          </div>
          <div className="flex flex-col mt-3">
          <select value={section.categoryname} onChange={handalCategory} name="categoryname" className="bg-gray-200 p-2 rounded-md outline-none">
    <option>Select Category</option>
    {
      categoryData.map((elem, index) => (
        <option value={elem.Categoryname}  key={index + 1}>
          {elem.Categoryname}
        </option>
      ))
    }
  </select>
           
          </div>
          <div className="flex flex-col mt-3">
          <select value={section.sectionname} onChange={handalCategory} name="sectionname" className="bg-gray-200 p-2 rounded-md outline-none">
    <option>Select Category</option>
    {
  !section.categoryname ==""?
  data?.sections?.map((elem, index) => (
    <option value={elem.name}  key={index + 1}>
      {elem.name}
    </option>
  ))
  
  :""
    }
   
  </select>
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

          {/* <div className="w-full flex justify-center">
            <button onClick={handleFeaturedProduct} className="bg-blue-700    mt-6 text-white px-10 py-2 text-lg font-semibold rounded-md">
              Add Featured Product
            </button>
          </div> */}
          <div >
   
    </div>
          <div className="flex flex-col mt-3">
            <div className="mb-16 mt-3 flex justify-center">
              <button
                // onClick={handalCilckCategory}
                className="bg-blue-700 text-white px-5 py-2 w-2/3 text-lg font-semibold rounded-md"
                 onClick={handalCilckCategory }
              >
              Create Section
              </button>
            
            </div>
          </div>

          
        </div>
      
      </div>
    </>
  );
};

export default CategoryItems;
