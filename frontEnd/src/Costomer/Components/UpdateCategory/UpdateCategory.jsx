import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Loader from '../Loader/Loader';
import DotLoader from '../DotLoader/DotLoader';

const UpdateCategory = ({ isShowUpdate, setisShowUpdate, CateData }) => {
  if (!isShowUpdate) return null;
const [isLoading, setisLoading] = useState(false)
  const [changeSection, setchangeSection] = useState("");
  
  const [selectedData, setselectedData] = useState({
    sections: "",
    items: "",
    categoryName: CateData?.Categoryname || ""
  });
 const [showMessage, setshowMessage] = useState("")
  const [items, setitems] = useState(null);
  const [itemsData, setitemsData] = useState("");

  useEffect(() => {
    setselectedData(prevState => ({
      ...prevState,
      categoryName: CateData?.Categoryname || ""
    }));
  }, [CateData]);

  const handleOwn = (e) => {
    const sectionData = CateData.sections.find((section) => section.name === e.target.value);
    setchangeSection(e.target.value);
    setitems(sectionData);
  };

  const handleSection = (e) => {
    setitemsData(e.target.value);
    setselectedData({
      ...selectedData,
      items: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "changeSection") {
      setchangeSection(value);
    } else if (name === "categoryName") {
      setselectedData({
        ...selectedData,
        categoryName: value,
      });
    } else {
      setselectedData({
        ...selectedData,
        [name]: value,
      });
    }
  };

  const handleItemChange = (e) => {
    setitemsData(e.target.value);
  };


  const UpdateCategory = async()=>{
    setisLoading(true)
try {
  let res = await axios.post("https://ecommerce-api-one-iota.vercel.app/categories/update",{id:CateData?._id,categoryName:selectedData?.categoryName,sections:changeSection,items:itemsData})
 
 
setshowMessage(res?.data?.message)
  
  
  setisLoading(false)
} catch (error) {
  setisLoading(false)
  setshowMessage(res?.message)
  console.log(error.message)
}



  }
  return (
    <>
      <div>
        <div className="flex justify-center items-center fixed z-40 left-[35vw] mt-16 top-0 ">
          <div className="w-[450px] h-[100vh] bg-[#ffff] overflow-y-scroll p-5">
            <span
              className="w-full flex justify-end cursor-pointer"
              onClick={() => setisShowUpdate(false)}
            >
              <CloseIcon />
            </span>
            <div className='flex justify-center font-semibold mb-2 text-red-600'>{showMessage}</div>
            <div>
              <h1 className="font-bold">Update Category</h1>
            </div>
            <div>
{
  isLoading?<Loader/>:""
}
            </div>
            <div className="flex flex-col mt-3">
              <label>Category Name:</label>
              <input
                name="categoryName"
                value={selectedData.categoryName}
                onChange={handleInputChange}
                className="bg-gray-200 p-2 rounded-md outline-none"
                type="text"
                placeholder="Enter Category Name"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label>Select Section Name</label>
              <select name="sections" onChange={handleOwn} className="p-1 outline-none bg-slate-100">
                <option>Select Section Name</option>
                {CateData?.sections?.map((elem) => (
                  <option key={elem._id} value={elem.name}>{elem.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mt-3">
              <label>Change Section Name:</label>
              <input
                name="changeSection"
                value={changeSection}
                onChange={handleInputChange}
                className="bg-gray-200 p-2 rounded-md outline-none"
                type="text"
                placeholder="Enter Section Name"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label>Select Items Name:</label>
              <select name="items" onChange={handleSection} className="p-2 outline-none bg-slate-200">
                <option>Select Items Name</option>
                {items?.items?.map((elem) => (
                  <option key={elem._id} value={elem.name}>{elem.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mt-3">
              <label>Items Data:</label>
              <input
                name="itemsData"
                value={itemsData}
                onChange={handleItemChange}
                className="bg-gray-200 p-2 rounded-md outline-none"
                type="text"
                placeholder="Enter Items Data"
              />
            </div>
            <div className="flex flex-col mt-3">
              <div className="mb-16 mt-3 flex justify-center">
                <button
                onClick={UpdateCategory}
                  className="bg-blue-700 text-white px-5 py-2 text-lg font-semibold rounded-md"
                  // onClick={productUpdate}
                >
                 {
                  isLoading?<DotLoader/>:"Update Category"
                 }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
