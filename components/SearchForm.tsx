
import React, { useState, useEffect, useCallback } from 'react';
import { TAIWAN_CITIES, PLACE_TYPES } from '../constants';
import { District } from '../types';

interface SearchFormProps {
  onSearch: (city: string, district: string, type: string, keyword: string) => void;
  isLoading: boolean;
}

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);


const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [selectedCity, setSelectedCity] = useState<string>(TAIWAN_CITIES[0].name);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('不拘');
  const [selectedType, setSelectedType] = useState<string>(PLACE_TYPES[0]);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const city = TAIWAN_CITIES.find((c) => c.name === selectedCity);
    if (city) {
      setDistricts([{ name: '不拘' }, ...city.districts]);
      setSelectedDistrict('不拘'); // Reset district to 'Any' when city changes
    }
  }, [selectedCity]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (selectedCity && selectedDistrict && selectedType) {
      onSearch(selectedCity, selectedDistrict, selectedType, keyword);
    }
  }, [onSearch, selectedCity, selectedDistrict, selectedType, keyword, isLoading]);
  
  const selectStyles = "w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 transition duration-150 ease-in-out p-3 bg-gray-50";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className={labelStyles}>縣市</label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={selectStyles}
            disabled={isLoading}
          >
            {TAIWAN_CITIES.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="district" className={labelStyles}>區域</label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className={selectStyles}
            disabled={isLoading || !districts.length}
          >
            {districts.map((district) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="type" className={labelStyles}>地點類型</label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={selectStyles}
            disabled={isLoading}
          >
            {PLACE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="keyword" className={labelStyles}>關鍵字搜尋 (選填)</label>
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 pl-10 p-3 bg-gray-50"
              placeholder="輸入店家名稱、特色等，例如：Mr.饅頭"
              disabled={isLoading}
            />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        {isLoading ? (
          '搜尋中...'
        ) : (
          <>
            <SearchIcon className="w-5 h-5 mr-2" />
            搜尋
          </>
        )}
      </button>
    </form>
  );
};

export default SearchForm;