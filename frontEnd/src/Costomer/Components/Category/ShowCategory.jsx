import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowCategory = () => {
  const [allCategories, setallCategories] = useState([]);

  useEffect(() => {
    const handalCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories/all");
        setallCategories(res.data.category);
      } catch (error) {
        console.error(error);
      }
    };

    handalCategories();
  }, []);

  return (
    <div className=" p-2 w-full    ">
      <div className="flex gap-4">
        {allCategories?.map((e) => (
          <>
            <div className="w-24 cursor-pointer">
              <Link to={`/category/product/${e.categoryname}`}>
                <div className="   rounded-full   mix-blend-multiply   flex flex-col justify-center items-center p-2 ">
                  <img
                    className="h-20 object-top   w-20 object-cover mix-blend-multiply   rounded-full"
                    src={e.productimage}
                    alt=""
                    srcset=""
                    
                  />
                </div>
                <h1 className="flex justify-center items-center font-medium capitalize">
                  {e.categoryname}
                </h1>
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ShowCategory;
