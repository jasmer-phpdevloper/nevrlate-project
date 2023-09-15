import React, { useState } from 'react';
import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
const StarRating = ({ totalStars, onRate }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    const newRating = starIndex + 1;
    setRating(newRating);
    onRate(newRating);
  };

  return (
    <div className="inline-flex items-center space-x-2 mb-4 font-normal text-lg leading-7 text-custom">
    {[...Array(totalStars)].map((_, index) => (
      <span
        key={index}
        onClick={() => handleStarClick(index)}
        className="cursor-pointer"
      >
        {index < rating ? <AiFillStar className="text-yellow-500" /> : <AiOutlineStar />}
      </span>
    ))}
  </div>
  
  );
};

export default StarRating;
