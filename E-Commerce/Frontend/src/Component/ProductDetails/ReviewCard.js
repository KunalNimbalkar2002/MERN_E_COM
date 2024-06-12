import React from "react";
import ReactStars from "react-rating-stars-component";
import user from "../../Assets/defaultUser.png";

const ReviewCard = ({ review }) => {
  const Options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img src={user} alt="user" />
      <p>{review.name}</p>
      <ReactStars {...Options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
