import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CreateCategory from '../../Components/CreateCategory/CreateCategory';
import { ToastContainer, toast } from 'react-toastify';

import { toastContext } from '../../../Context-Api/Context';
import axios from 'axios';
import CategorySection from '../../Components/CreateCategorySection/CategorySection';
import CategoryItems from '../../Components/CreateCategoryItems/CategoryItems';
const AllCategory = () => {
  const [isOpenSection, setisOpenSection] = useState(false)
    const [isPortalOpen, setisPortalOpen] = useState(false)
    const [isOpenItems, setisOpenItems] = useState(false)
    const [categoryData, setcategoryData] = useState([])
    const [sectionData, setsectionData] = useState([])
console.log("category data ",categoryData)
 console.log(sectionData,"section data ")
const fetchApisDataForCategory =async ()=>{
  let res = await axios.get("http://localhost:3000/categories/nav/all")
  let data = res?.data?.category
  setcategoryData(data)
  if(data){
    data.map((elem)=>(
console.log("section", elem)


    ))
  }
    }
  
  
  
  useEffect(() => {
    fetchApisDataForCategory()
  }, [])
  

  return (
    <>
     <ToastContainer/>
   <div className='absolute top-40'>
  
   </div>
    <div className='w-full'>
<div className='p-4  '>
<div className=' bg flex justify-between  '>
<button onClick={(()=>setisOpenItems(true))} className='p-3 bg-blue-600 rounded-md text-white font-semibold'>Create  new Item</button>
  <button onClick={(()=>setisOpenSection(true))} className='p-3 bg-blue-600 rounded-md text-white font-semibold'>Create  new Section</button>
<button onClick={()=>setisPortalOpen(true)} className='p-3 bg-blue-600 rounded-md text-white font-semibold'>Create Category</button>
</div>
<table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-start px-4 py-2">sr</th>
              <th className="text-start px-4 py-2">Category Name</th>
              <th className="text-start px-4 py-2">Section Name</th>
              <th className="text-start px-4 py-2">Item Name</th>
              <th className="text-start px-4 py-2">Created At</th>
              <th className="text-start px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            
                <tr >
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">helo</td>
                  <td className="border px-4 py-2">u.emai</td>
                  <td className="border w-1/5 px-4 py-2">u.roll</td>
                  <td className="border px-4 py-2">2;3</td>
                  <td className="border px-4 py-2 cursor-pointer">
                  <EditIcon/>
                  </td>
                </tr>
             
            
          </tbody>
        </table>
</div>


    </div>
    <CategoryItems categoryData={categoryData} sectionData={sectionData}  isOpenItems={isOpenItems} setisOpenItems={setisOpenItems} />
   <CategorySection categoryData={categoryData} isOpenSection={isOpenSection }  setisOpenSection={setisOpenSection } />
    <CreateCategory  isPortalOpen={isPortalOpen} setisPortalOpen = {setisPortalOpen}/>
    </>
  
  )
}

export default AllCategory