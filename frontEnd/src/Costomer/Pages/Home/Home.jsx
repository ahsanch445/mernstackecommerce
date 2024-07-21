import React, { useContext, useEffect ,useState} from 'react'
import Crousel from '../../Components/HomeCrousel/Crousel'
import CategoryCarousel from '../../Components/CardCrousel/CategoryCarousel'
import Cookies from 'js-cookie'
import { toastContext } from '../../../Context-Api/Context'
import { ToastContainer, toast } from 'react-toastify'
import Footer from '../../Components/Footers/Footer'
import { CategoryData } from '../../Common/APi'
import axios from 'axios'

const Home = () => {
let {userRegister,setuserRegister} = useContext(toastContext)
const [Category, setCategory] = useState([])
let token = Cookies.get("token")

useEffect(() => {
 const getUser = async () => {

  try {
    const res = await axios.get("https://frontend-eight-zeta-18.vercel.app/users/profile",{
      headers:{
        Authorization:`${token}`
      }
    })
    localStorage.setItem("user",JSON.stringify(res.data))
     console.log(res.data)
  } catch (error) {
    console.log(error.message)
  }
 }
  getUser()

}, [])

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
    <Footer/>
    </>
  )
}

export default Home
