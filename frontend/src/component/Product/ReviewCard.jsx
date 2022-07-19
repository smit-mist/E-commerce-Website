import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../image/Profile.png";
const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    readOnly:true,
    precision:0.5,  
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} value={review.rating}/>
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
