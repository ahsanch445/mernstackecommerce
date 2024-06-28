import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Link } from "react-router-dom";

const UserDetails = ({ user}) => {
    
  const [Avatarname, setAvatarname] = useState("");
  useEffect(() => {
//     var data = user?.fullname?.split(" ")[1].split("")[0];
// setAvatarname(data)
   
  }, []);

  return (
    <div className="bg-[#f7f7f7] h-[calc(100vh-105px)]">
      <div className="flex justify-center p-6">
        <div className="">
          <Avatar
            className="m-auto"
            
            sx={{ bgcolor: deepOrange[500], height: 60, width: 60 }}
          >
            {Avatarname}
          </Avatar>
          <h1 className="traking-tight font-semibold">{user?.fullname}</h1>
          <h5 className="traking-tight font-semibold flex justify-center  ">{user?.roll}</h5>
          
        </div>
        
        <div>
        
        </div>
      </div>
      <div className="w-full mt-3  px-7 flex flex-col ">
          <Link to={"alluser"} className="font-semibold text-lg cursor-pointer ">All Users</Link>
          <Link to={"allproducts"}
           className="font-semibold text-lg mt-4 cursor-pointer ">All Product</Link>
           <Link to={"allcategories"} className="font-semibold text-lg mt-4 cursor-pointer ">
           All Categories
           </Link>
          </div>
    </div>
  );
};

export default UserDetails;
