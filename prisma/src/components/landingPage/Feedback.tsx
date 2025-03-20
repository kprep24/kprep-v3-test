"use client"

import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import Link from "next/link";

const FeedbackComponent = () => {
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="relative flex items-center justify-center py-24 bg-gradient-to-br from-green-100 via-gray-100 to-blue-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 bg-gradient-to-br from-[rgba(50,87,128,0.3)] to-[rgba(50,87,128,0.3)] blur-[202px]"></div>
      </div>
      <div className="relative text-center w-80 sm:w-96">
        <h2 className="text-5xl font-normal">Your Opinion </h2>
        <h2 className="text-5xl font-normal"> Matters</h2>

        <p className="text-gray-600 text-xl mt-5">Tell us how we’re doing!</p>
        
        {/* Star Rating */}
        <div className="flex justify-center mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-4xl mx-1 ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Submit Button */}
    <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeTuFqbdYdktp47G-98T6Hs9WEtrVQtnRHuD7kyNZ4bNGAiNw/viewform" >    <button 
          className="mt-6 px-4 py-2 border-2 border-black rounded-full text-black hover:bg-[#74aa63] hover:text-white  hover:border-[#74aa63] transition-all"
          // onClick={handleSubmit}
        >
          SUBMIT
        </button>
        </Link>
      </div>
    </div>
  );
};

export default FeedbackComponent;
