import React, { useMemo } from 'react';
import { PetFriendlyPlace, Review } from '../types';
import StarRating from './StarRating';

interface ResultCardProps {
  place: PetFriendlyPlace;
  isFavorite: boolean;
  onToggleFavorite: (place: PetFriendlyPlace) => void;
  onShowReviews: (place: PetFriendlyPlace) => void;
  reviews: Review[];
}

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);

const HeartIcon: React.FC<{ filled?: boolean, className?: string }> = ({ filled, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <g><path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.596,44,30.163,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></g>
  </svg>
);


const ResultCard: React.FC<ResultCardProps> = ({ place, isFavorite, onToggleFavorite, onShowReviews, reviews }) => {

  const reviewData = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { average: 0, count: 0 };
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      average: total / reviews.length,
      count: reviews.length,
    };
  }, [reviews]);
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full relative">
       <button 
        onClick={() => onToggleFavorite(place)}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/70 hover:bg-white text-red-500 transition-colors z-10"
        aria-label={isFavorite ? '從收藏移除' : '加入收藏'}
       >
        <HeartIcon filled={isFavorite} className="w-6 h-6" />
       </button>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-teal-700 mb-2 pr-10">{place.name}</h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => onShowReviews(place)}>
              <span className="font-bold text-base text-blue-600">站內</span>
              <StarRating rating={reviewData.average} readOnly />
              <span className="font-semibold">{reviewData.average.toFixed(1)}</span>
              <span>({reviewData.count})</span>
          </div>
          {place.google_rating && (
            <div className="flex items-center gap-1">
                <GoogleIcon className="w-4 h-4" />
                <span className="font-semibold">{place.google_rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex items-start text-gray-600 mb-4">
          <LocationIcon className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-gray-400" />
          <p>{place.address}</p>
        </div>
        {place.distance && (
            <div className="flex items-start text-indigo-600 mb-4 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p>距離您約 {place.distance.toFixed(1)} 公里</p>
            </div>
        )}
        <div className="flex items-start text-gray-700 flex-grow">
          <InfoIcon className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-gray-400" />
          <p className="text-sm">{place.description}</p>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 mt-auto border-t flex flex-col sm:flex-row gap-2 justify-between items-center">
        <button 
          onClick={() => onShowReviews(place)}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          查看/新增站內評論
        </button>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 border-gray-300 transition-colors"
        >
          <GoogleIcon className="w-4 h-4 mr-2" />
          在 Google 上查看
        </a>
      </div>
    </div>
  );
};

export default ResultCard;