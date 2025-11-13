
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      <p className="ml-4 text-gray-600 font-semibold">正在為您搜尋...</p>
    </div>
  );
};

export default LoadingSpinner;
