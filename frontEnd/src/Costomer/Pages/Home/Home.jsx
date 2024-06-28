import React, { useContext, useEffect ,useState} from 'react'
import Crousel from '../../Components/HomeCrousel/Crousel'
import CategoryCarousel from '../../Components/CardCrousel/CategoryCarousel'

import { toastContext } from '../../../Context-Api/Context'
import { ToastContainer, toast } from 'react-toastify'

import { CategoryData } from '../../Common/APi'

const Home = () => {
let {userRegister,setuserRegister} = useContext(toastContext)
const [Category, setCategory] = useState([])
useEffect(() => {
  if(userRegister){
    toast.success(userRegister)
    setuserRegister("")
  }


 
}, [userRegister])


useEffect(() => {
(async function (){
let data = await CategoryData()
setCategory(data.category)
})()
}, [])


  return (
    
    <>
  
    <ToastContainer/>
   
    <div className=' space-y-10  flex flex-col justify-center px-2 '>
       
       <Crousel/>
      {
        Category.map((category,index)=><>
        <CategoryCarousel key={index|| category._id|| category.id}  category={category}/>
      
        </> 
        
       )
      }
       
      
    </div>
    
    </>
  )
}

export default Home
