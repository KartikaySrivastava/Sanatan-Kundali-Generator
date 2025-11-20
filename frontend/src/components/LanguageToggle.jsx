import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage, isHindi } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`relative inline-flex items-center px-5 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 group overflow-hidden ${className}`}
      title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
    >
      {/* Animated background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-transform duration-300 ease-in-out ${
          isHindi ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          background: isHindi 
            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
            : 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
          borderRadius: 'inherit'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center space-x-3">
        {/* Icon */}
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${
            isHindi ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        
        {/* Toggle Switch */}
        <div className="relative w-16 h-8 bg-gray-200 rounded-full p-1">
          <div 
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out flex items-center justify-center text-xs font-bold ${
              isHindi ? 'translate-x-8 bg-yellow-300' : 'translate-x-0 bg-blue-500 text-white'
            }`}
          >
            {isHindi ? 'हि' : 'EN'}
          </div>
          
          {/* Language indicators */}
          <div className="absolute inset-0 flex justify-between items-center px-2">
            <span 
              className={`text-xs font-bold transition-colors duration-300 ${
                !isHindi ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              EN
            </span>
            <span 
              className={`text-xs font-bold transition-colors duration-300 ${
                isHindi ? 'text-yellow-600' : 'text-gray-400'
              }`}
            >
              हिं
            </span>
          </div>
        </div>
        
        {/* Label */}
        <span 
          className={`text-sm font-medium transition-colors duration-300 ${
            isHindi ? 'text-white' : 'text-gray-700 group-hover:text-blue-700'
          }`}
        >
          {isHindi ? 'हिंदी' : 'English'}
        </span>
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
    </button>
  );
};

export default LanguageToggle;