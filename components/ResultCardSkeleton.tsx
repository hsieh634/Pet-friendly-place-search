import React from 'react';

const ResultCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse">
      <div className="p-5 flex-grow flex flex-col">
        {/* Title */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        
        {/* Ratings */}
        <div className="flex gap-4 mb-3">
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        </div>

        {/* Address */}
        <div className="flex items-start mb-4">
          <div className="w-5 h-5 bg-gray-300 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-100 px-5 py-3 mt-auto border-t flex justify-between items-center">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-8 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default ResultCardSkeleton;
