'use client';
import React from 'react';

interface CardProps {
  value: number;
  isFlipped: boolean;
  onClick: () => void;
  isFound: boolean;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, onClick, isFound }) => {
  return (
    <div
      className={`relative w-24 h-32 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer ${
        isFlipped || isFound ? 'bg-gray-100' : 'bg-blue-500'
      }`}
      onClick={onClick}
    >
      {(isFlipped || isFound) ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Show image when flipped */}
          <img src={`/images/card${value}.PNG`} alt={`Card ${value}`} className="w-full h-full object-cover rounded-xl" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Hide value when not flipped */}
        </div>
      )}
    </div>
  );
};

export default Card;