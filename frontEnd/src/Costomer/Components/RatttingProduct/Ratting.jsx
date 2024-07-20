// src/components/RatingsAndReviews.js
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Ratting from '../RattingCard/Ratting';
const RatingStar = ({ filled, onClick,  }) => {
   
  return (
    <svg
      onClick={onClick}
      className={`w-6 h-6 cursor-pointer ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049.927a1 1 0 011.902 0l1.667 5.134a1 1 0 00.95.692h5.352a1 1 0 01.591 1.81l-4.332 3.17a1 1 0 00-.364 1.118l1.667 5.134a1 1 0 01-1.54 1.118L10 14.347l-4.333 3.17a1 1 0 01-1.54-1.118l1.667-5.134a1 1 0 00-.364-1.118L1.098 8.563a1 1 0 01.591-1.81h5.352a1 1 0 00.95-.692L9.049.927z" />
    </svg>
  );
};

const RatingsAndReviews = (isShowRatting,handleRatting) => {
    
    if(!isShowRatting?.isShowRatting) return null
    
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState({});

  const handleRatingClick = (index) => {
    setRating(index);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    isShowRatting.handleRatting(rating,review)
    if (rating && review) {
      setReviews({ rating, review });
      setRating(0);
      setReview('');
      setReviews([])
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4 absolute top-6 bg-slate-200 w-96 rounded-md left-[30%] space-y-4">
        <div className=' cursor-pointer' onClick={()=>isShowRatting.setisShowRatting(false)}><CloseIcon/></div>
      <h1 className="text-2xl font-bold mb-4">Ratings and Reviews</h1>

      {/* Rating Stars */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <RatingStar
            key={index}
            filled={index < rating}
            onClick={() => handleRatingClick(index + 1)}
          />
        ))}
      </div>

      {/* Review Form */}
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        />
        <button  type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>

      {/* Reviews List */}
      {/* <div className="space-y-4">
        {reviews.map((rev, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, idx) => (
                  <RatingStar key={idx} filled={idx < rev.rating} />
                ))}
              </div>
              <span className="text-gray-600">{rev.rating} / 5</span>
            </div>
            <p className="mt-2 text-gray-800">{rev.review}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default RatingsAndReviews;
