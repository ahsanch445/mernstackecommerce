import React from 'react';
import { Rating } from '@mui/material';

const SingleStarRating = ({ rating }) => {
  const getStarStyle = (rating) => {
    if (rating >= 5) {
      return <Rating precision={0.5} style={{ fontSize: "25px" }} readOnly value={1} max={1} />;
    } else if (rating >= 4) {
      return <Rating precision={0.5} style={{ fontSize: "25px" }} readOnly value={0.8} max={1} />;
    } else if (rating >= 3) {
      return <Rating precision={0.5} style={{ fontSize: "25px" }} readOnly value={0.6} max={1} />;
    } else if (rating >= 2.5) {
      return <Rating precision={0.5} style={{ fontSize: "25px" }} readOnly value={0.5} max={1} />;
    } else if (rating >= 2) {
      return <Rating precision={0.5} style={{ fontSize: "25px" }} readOnly value={0.4} max={1} />;
    } else if (rating >= 1) {
      return <Rating precision={0.5} style={{ fontSize: "25px" }} readOnly value={0.2} max={1} />;
    } else {
      return <Rating precision={0.5} style={{ fontSize: "25px" }} readOnly value={0} max={1} />;
    }
  };

  return (
    <>
      {getStarStyle(rating)}
    </>
  );
};

export default SingleStarRating;
