import React from 'react';

const Card = ({ imageSrc, heading, description, mood, compatibility, luckyNumber }) => {
  return (
    <div className="flex flex-col p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 mx-auto">
        <img
          src={imageSrc}
          alt="Card Icon"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{heading}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4">
          <p className="text-gray-500"><strong>Mood:</strong> {mood}</p>
          <p className="text-gray-500"><strong>Compatibility:</strong> {compatibility}</p>
          <p className="text-gray-500"><strong>Lucky Number:</strong> {luckyNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
