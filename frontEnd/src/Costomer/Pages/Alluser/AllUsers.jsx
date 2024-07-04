import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import 'tailwindcss/tailwind.css';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie"
import { ToastContainer, toast } from 'react-toastify';
const AllUsers = () => {
  const [alluser, setAllUser] = useState([]);
 const [updateUser, setupdateUser] = useState(false)
  const [allusers, setallusers] = useState([])

const [profileUser, setprofileUser] = useState()


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkRole, setCheckRole] = useState({
    role:"",
    userId:""
  });
  



  

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/alluser");
      setAllUser(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const user = JSON.parse(localStorage.getItem("user"))
  
  useEffect(() => {
   
    setprofileUser(user)
 
  
    fetchAllUsers();
  }, [updateUser]);

 

  useEffect(() => {
    
      const filterUser = alluser?.filter((user) => user?._id !== profileUser?._id);
      setallusers(filterUser);
      
 

    
    
  }, [alluser]);

  
  const handleEditClick = (user) => {
    setCheckRole({
      ...checkRole,
      userId:user._id
    })
    setSelectedUser(user);
  
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const handalRole = async()=>{
   try {
    const res = await axios.put("http://localhost:3000/users/updaterole",checkRole)
  if(res.data.message){
    setupdateUser(!updateUser)
toast.success(res.data.message)
  }
   } catch (error) {
    console.error(error)
   }
   
   }

  //  userprofile
  let token  = Cookies.get("token")
  const userProfile = async ()=>{
  
   
    try {
      const data = await axios.get("http://localhost:3000/users/profile",{
        headers:{
          Authorization:`${token}`
        }
      })
   
      // dispatch(setuser(data.data))
      localStorage.setItem("user",JSON.stringify(data.data))
        setprofileUser(data.data)

console.log(data)
     
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => {
   
  userProfile()
    
  }, [ token ])

  return (
    <div className='p-3 w-full'>
      <ToastContainer />
      <aside>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-start px-4 py-2">sr</th>
              <th className="text-start px-4 py-2">Name</th>
              <th className="text-start px-4 py-2">Email</th>
              <th className="text-start px-4 py-2">Role</th>
              <th className="text-start px-4 py-2">Created At</th>
              <th className="text-start px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allusers.length > 0 ? (
              allusers.map((u, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{u.fullname}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border w-1/5 px-4 py-2">{u.roll}</td>
                  <td className="border px-4 py-2">{moment(u.createdAt).format('LL')}</td>
                  <td className="border px-4 py-2 cursor-pointer">
                    <EditIcon onClick={() => handleEditClick(u)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center border px-4 py-2">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </aside>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCloseModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">User Details</h3>
              <div className="mb-2">
                <strong>Name:</strong> {selectedUser.fullname}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div className="mb-2">
                <strong>Role:</strong> {selectedUser.roll}
              </div>
              <div className="mb-2">
                <strong>Created At:</strong> {moment(selectedUser.createdAt).format('LL')}
              </div>
              {/* Add more user details here if needed */}
              <div className="mb-4">
                <label htmlFor="role-select" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Change Role:</label>
                <select
                  id="role-select"
                  className="block w-full px-3 py-2 mt-1 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={checkRole.role}
                  onChange={(e) => setCheckRole({
                    ...checkRole,
                    role:e.target.value
                  })}
                >
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ADMIN">ADMIN</option>
                  
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
                <button
                  onClick={handalRole}
                  className="py-2.5 px-5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
