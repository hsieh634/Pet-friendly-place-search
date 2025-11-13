import React from 'react';

interface HeaderProps {
    onShowFavorites: () => void;
}

const PawIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.5-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12.01 18c-1.1 0-2.11-.45-2.84-1.17-.18-.18-.44-.24-.69-.15-.53.2-1.12.32-1.73.32-2.21 0-4-1.79-4-4 0-1.13.47-2.15 1.22-2.88.24-.24.24-.64 0-.88-.24-.24-.64-.24-.88 0C2.71 10.43 2 11.66 2 13c0 2.76 2.24 5 5 5 .89 0 1.71-.24 2.44-.66.23-.13.53-.06.7.11.75.75 1.76 1.18 2.87 1.18s2.12-.43 2.87-1.18c.17-.17.47-.24.7-.11.73.42 1.55.66 2.44.66 2.76 0 5-2.24 5-5 0-1.34-.71-2.57-1.76-3.32-.24-.18-.58-.12-.76.12s-.12.58.12.76C19.53 10.85 20 11.87 20 13c0 2.21-1.79 4-4 4-.61 0-1.2-.12-1.73-.32-.25-.09-.51-.03-.69.15-.73.72-1.74 1.17-2.84 1.17z"/>
  </svg>
);


const Header: React.FC<HeaderProps> = ({ onShowFavorites }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
         <div className="flex items-center">
            <PawIcon className="h-10 w-10 text-teal-500 mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Pet-Friendly Place Finder
            </h1>
         </div>
         <button 
            onClick={onShowFavorites}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            我的收藏
         </button>
      </div>
    </header>
  );
};

export default Header;
