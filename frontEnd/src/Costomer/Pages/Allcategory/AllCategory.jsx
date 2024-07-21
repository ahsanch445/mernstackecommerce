import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CreateCategory from '../../Components/CreateCategory/CreateCategory';
import { ToastContainer, toast } from 'react-toastify';

import { toastContext } from '../../../Context-Api/Context';
import axios from 'axios';
import CategorySection from '../../Components/CreateCategorySection/CategorySection';
import CategoryItems from '../../Components/CreateCategoryItems/CategoryItems';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import UpdateCategory from '../../Components/UpdateCategory/UpdateCategory';
const AllCategory = () => {
  const [isOpenSection, setisOpenSection] = useState(false)
    const [isPortalOpen, setisPortalOpen] = useState(false)
    const [isOpenItems, setisOpenItems] = useState(false)
    const [categoryData, setcategoryData] = useState([])
    const [sectionData, setsectionData] = useState([])
    const [isPortalOpenUpdate, setisPortalOpenUpdate] = useState(false)
const [allCategory, setallCategory] = useState([])
const [isShowUpdate, setisShowUpdate] = useState(false)
const [CateData, setCateData] = useState(null)

const fetchApisDataForCategory =async ()=>{
  let res = await axios.get("http://localhost:3000/categories/nav/all")
  let data = res?.data?.category
  setcategoryData(data)

  
    }
    const  getUpdateCategory = (Id)=>{
      axios.put(`https://ecommerce-api-one-iota.vercel.app/categories/getcategory/${Id}`).then((res)=>{
        setCateData(res
            .data.category

        )
     }).catch((err)=>{
         console.log(err)
     })}
  
    const fetchApisDataCategory =async ()=>{
      let res = await axios.get("https://ecommerce-api-one-iota.vercel.app/categories/allcategories")
      setallCategory(res.data.category)
    }

    const handleDeleteCategory = async (id) => {
try {
  
 let res =  await axios.delete(`https://ecommerce-api-one-iota.vercel.app/categories/delete/${id}`)
 console.log(res.data)
 setisPortalOpenUpdate((prev)=>!prev)
} catch (error) {
  console.error(error)
}
    }
    

  
  useEffect(() => {
    fetchApisDataForCategory()
    fetchApisDataCategory()
  }, [isPortalOpenUpdate])
  

  return (
    <>
    <UpdateCategory CateData={CateData} getUpdateCategory={getUpdateCategory} isShowUpdate ={isShowUpdate} setisShowUpdate={setisShowUpdate}/>
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
<div className='mt-3'>
<hr />
<hr />


</div>

</div>
<table className="table-auto w-full">
<thead>
<tr>
              <th className="text-start px-4 py-2">sr</th>
              <th className="text-start px-4 py-2">Category Name</th>
              
              <th className="text-start px-4 py-2">Created At</th>
              <th className="text-start px-4 py-2">Action</th>
              <th className="text-start px-4 py-2">Delete</th>

            </tr>
           </thead>
{
  allCategory?.map((ele,index)=>{
    return(

      
          <tbody key={index+1}>
            
                <tr >
                  <td className="border px-4 py-2">{index+1}</td>
                  <td className="border px-4 py-2">{ele.Categoryname}</td>
                 
                  <td className="border px-4 py-2">{moment(ele.createdAt).format("DD-MM-YYYY")}</td>
                  <td className="border px-4 py-2 cursor-pointer">
                 <div onClick={()=>{
                   getUpdateCategory(ele._id)
                  setisShowUpdate(true)}}><  EditIcon /></div>
                  </td>
                  <td className="border px-4 py-2 cursor-pointer">
                  <div onClick={()=>handleDeleteCategory(ele._id)}><  DeleteIcon /></div>
                  </td>
                </tr>
             
            
          </tbody>
       
    )
}
  )}
   </table>
    </div>
    <CategoryItems categoryData={categoryData} sectionData={sectionData}  isOpenItems={isOpenItems} setisOpenItems={setisOpenItems} />
   <CategorySection categoryData={categoryData} isOpenSection={isOpenSection }  setisOpenSection={setisOpenSection } />
    <CreateCategory  isPortalOpen={isPortalOpen} setisPortalOpen = {setisPortalOpen}/>
    </>
  
  )
}

export default AllCategory