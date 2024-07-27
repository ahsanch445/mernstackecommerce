import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../Navigation/Nav";
import axios from "axios";
import ShowCategory from "../Category/ShowCategory";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { setAddToCart } from "../../../Store/userSlice";

import CustomRating from "./CustomRatting";
import ReactStars from 'react-rating-stars-component';
const CategoryProducts = ({data}) => {

 let navigte = useNavigate()
 let dispatch = useDispatch()

 const handalAddToCart =(data1)=>{

  dispatch(setAddToCart({isProductDetails:false,product:data1}))
 }
const handalproductdetails =()=>{
 
     navigte(`/product/${data._id}`, { state: { product: data } });
}

  return (
    <>
      {
        <div className="p-2   flex justify-center items-center ">
          <div className="flex gap-6">
            <div className="md:w-[300px] md:h-[450px] w-52 p-1 rounded-md cursor-pointer shadow-xl bg-white">
              <div onClick={() => {
                handalproductdetails()
                handalAddToCart(data)
              }}>
                <img
                  className="md:h-72 h-48 object-top object-cover w-full mix-blend-multiply transform transition-all duration-300 hover:scale-105 rounded-md group-hover:-translate-y-2"
                  src={data?.productimage[0]}
                  alt=""
                  srcset=""
                />
                <h1 className=" px-1 md:mt-2 md:text-xl  font-bold text-lg">{data?.productname}</h1>
                <hr />
                <div className=" px-1 flex justify-between items-center mt-2 mb-2">
                  <h1 className="font-medium text-lg">Rs {data?.selling_price}</h1>
                  <span className="flex justify-center">
                    <div className="flex justify-center items-center">
                      <span className="font-medium md:text-xl">{data?.ratting}</span>
                      <div className="flex justify-center md:text-xl">
                        <CustomRating
                          rating={data?.ratting}
                        />
                      </div>
                    </div>
                  </span>
                </div>
                <hr />
              </div>
              <div className="py-2 px-4">
                <div className="button mt-2">
                  <button onClick={() => handalAddToCart(data)} className="text-white bg-blue-700 md:px-5 md:py:4 px-3 py-2 hover:scale-105 duration-300 hover:bg-blue-800 font-medium rounded-md">
                    {" "}
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default CategoryProducts;
