import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Product.css';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import Ratting from '../RattingCard/Ratting';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartQtn, setAddToCart, setSize } from '../../../Store/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { toastContext } from '../../../Context-Api/Context';

const ProductDetalis = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSize, setisSize] = useState('S');
  const [isProductDetails, setisProductDetails] = useState(false);
  const [userRatting, setuserRatting] = useState([]);
  const [imgUrl, setimgUrl] = useState();
  const [orderQtn, setorderQtn] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
const [handleRatting, sethandleRatting] = useState(false);
  const imgRef = useRef(null);
  let navigate = useNavigate();
  const location = useLocation();
  let dispatch = useDispatch();
  let user = localStorage.getItem('user');
  
  const { product } = location.state || {};

  const fetchData = useCallback(async () => {
  
    setLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce-api-one-iota.vercel.app/product/getreview/${product._id}`,
        { page, limit: 10 }
      );
      if (response.data.ratting.length > 0) {
        setuserRatting((prevData) => [...prevData, ...response.data.ratting]);
        setTotalPages(response.data.totalPages);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, [page, product._id]);

  // Lazy scrolling
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    if (page <= totalPages) {
      fetchData();
    }
  }, [loading, page, totalPages, fetchData]);


  
  
    
    // eslint-disable-next-line react-hooks/exhaustive-deps


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSize = (e) => {
    setisSize(e.target.value);
  };

  const handleCartQtn = (id, data) => {
    dispatch(setSize(isSize));
    setorderQtn(data);
    dispatch(CartQtn({ productId: id, data }));
  };

  const handalImageClik = (image) => {
    setimgUrl(image);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setisProductDetails(true);
    
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };
  useEffect(() => {
    fetchData();
  }, [handleRatting])
  

  return (
    <div>
      <section id="product-info">
        <div className="item-image-parent">
          <div className="item-list-vertical w-28 lg:w-12 ">
            {product?.productimage?.map((image, index) => (
              <div className="thumb-box   " key={index}>
                <img className='md:pointer-events-none lg:pointer-events-auto'
                  onClick={() => handalImageClik(image)}
                  src={image}
                  alt="thumbnail"
                />
              </div>
            ))}
          </div>
          <div className="item-image-main main-container bg-white">
            <div className="image-con">
              {!imgUrl ? (
                <img
                
                  onMouseMove={handleMouseMove}
                  ref={imgRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className=" md:pointer-events-none lg:pointer-events-auto cursor-pointer max-w-72 max-h-[600px] lg:max-h-[340px] rounded-md object-top lg:max-w-64"
                  src={product?.productimage[0]}
                  alt="default"
                />
              ) : (
                <img
                  ref={imgRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className=" max-h-[600px] lg:max-h-[340px] rounded-md  object-top object-fit cursor-pointer max-w-72 lg:max-w-64"
                  src={imgUrl}
                  alt="default"
                />
              )}
              <div
                style={{ pointerEvents: 'none' }}
                className="absolute h-80 right-10 w-2/4 top-28 z-10"
              >
                {zoom && (
                  <div
                    className="zoomed-image bg-slate-600 h-full"
                    style={{
                      backgroundImage: `url(${imgUrl || product?.productimage[0]})`,
                      backgroundPosition: `${position.x}% ${position.y}%`,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="item-info-parent">
          <div className="main-info mt-3">
            <h4 className='text-[30px] lg:text-[21px] '>{product?.productname}</h4>
            <div className="star-rating  lg:0   mt-2">
              <Rating
                precision={0.5}
                
                readOnly
                className="h-fit leading-none alo "
                name="haif-rating"
                value={product?.ratting}
              />
            </div>
            <p className='alo' >
              Price: <span id="price">Rs{product?.selling_price}</span>{' '}
              <span className="line-through" id="price1">
                {product?.price}
              </span>{' '}
            </p>
            <p className='alo'> 
              Discount : {Math.floor(product?.discountParacentage)}%
            </p>
            <p className='alo'>Brand name: {product?.brandname}</p>
          </div>
          <div className="select-items">
            <div className="change-color flex">
              <div>
                <div className="change-size">
                  <label>
                    <b>Size:</b>
                  </label>
                  <br />
                  <select
                    onChange={handleSize}
                    className="bg-gray-200 w-20 h-10 lg:w-16 lg:h-8 text-xl lg:text-base"
                    value={isSize}
                  >
                    {product?.Size?.map((elem, index) => (
                      <option key={index}>{elem}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center ml-32 ">
                <button
                  onClick={() => {
                   !user?navigate("/login"):
                    navigate(`/Checkout/${5}`, {
                      state: { size: isSize },
                    });
                    dispatch(
                      setAddToCart({ isProductDetails: true, product, isSize })
                    );
                  }}
                  className="addtocart p-5 lg:p-2 w-52 lg:w-40"
                >
                  <div className="pretext gap-2">
                    <AddShoppingCartIcon /> <p>Add To Cart</p>
                  </div>
                </button>
              </div>
            </div>
            <div
              style={{ userSelect: 'none' }}
              className="flex items-center gap-2"
            >
              <h1 className="text-gray-700 text-2xl lg:text-lg ">Quantity:</h1>
              <h1
                onClick={() => handleCartQtn(product._id, orderQtn - 1)}
                className="px-2  cursor-pointer max-h-7 flex justify-center items-center max-w-7 text-xl font-bold bg-gray-200 hover:bg-slate-300"
              >
                -
              </h1>
              <h1>{orderQtn}</h1>
              <h1
                onClick={() => handleCartQtn(product._id, orderQtn + 1)}
                className="px-2 cursor-pointer max-h-7 flex justify-center items-center max-w-7 text-xl font-bold bg-gray-200 hover:bg-slate-300"
              >
                +
              </h1>
            </div>
            <div className="description mt-2">
              {product?.descripsion && (
               <p style={{lineHeight:"none"}} className="p-4 bg-white t rounded-lg ">
               <span className="font-semibold opacity-70 text-gray-800">Description:</span>
               <span className="text-gray-600">{product?.descripsion}</span>
             </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Rating Section */}
      <section>
        {userRatting?.length > 0 &&(
          <h1 className="font-semiblod text-lg p-2 w-full">
            Recent Ratting & Reviews
          </h1>
        )}
        

          <Grid container>
            <div className="border p-5 w-full">
              <Grid className="space-y-5 w-full ">
                <Ratting product={product} sethandleRatting={sethandleRatting} userRatting={userRatting} />
              </Grid>
            </div>
          </Grid> 

    

      </section>
    </div>
  );
};

export default ProductDetalis;
