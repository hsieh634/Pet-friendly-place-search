
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import Map from './components/Map';
import Modal from './components/Modal';
import ResultCard from './components/ResultCard';
import StarRating from './components/StarRating';
import { findPetFriendlyPlaces } from './services/geminiService';
import { PetFriendlyPlace, Review } from './types';

// Haversine distance calculation
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const RESULTS_PER_PAGE = 20;

const App: React.FC = () => {
  const [results, setResults] = useState<PetFriendlyPlace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchedCity, setSearchedCity] = useState<string>('');

  // State for new features
  const [favorites, setFavorites] = useState<PetFriendlyPlace[]>([]);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  const [selectedPlaceForMap, setSelectedPlaceForMap] = useState<PetFriendlyPlace | null>(null);
  
  // Modal states
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [reviewingPlace, setReviewingPlace] = useState<PetFriendlyPlace | null>(null);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Client-side pagination state
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);
  
  // Sorting and location states
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [sortOrder, setSortOrder] = useState('default');


  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Could not get user location", error);
        // Silently fail, distance sorting will just be unavailable
      }
    );
  }, []);

  // Load favorites and reviews from localStorage on initial mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('pet_friendly_favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      const storedReviews = localStorage.getItem('pet_friendly_reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    } catch (e) {
      console.error("Failed to parse from localStorage", e);
    }
  }, []);

  const handleSearch = useCallback(async (city: string, district: string, type: string, keyword: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setResults([]);
    setSearchedCity(city);
    setVisibleCount(RESULTS_PER_PAGE);
    setSortOrder('default');

    try {
      const places = await findPetFriendlyPlaces(city, district, type, keyword);
      setResults(places);
    } catch (err) {
      setError('搜尋時發生錯誤，請稍後再試。');
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + RESULTS_PER_PAGE);
  }, []);

  const getPlaceId = (place: PetFriendlyPlace) => `${place.name}-${place.address}`;

  const handleToggleFavorite = useCallback((place: PetFriendlyPlace) => {
    setFavorites(prevFavorites => {
      const placeId = getPlaceId(place);
      const isFavorited = prevFavorites.some(p => getPlaceId(p) === placeId);
      let newFavorites;
      if (isFavorited) {
        newFavorites = prevFavorites.filter(p => getPlaceId(p) !== placeId);
      } else {
        newFavorites = [...prevFavorites, place];
      }
      localStorage.setItem('pet_friendly_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const handleShowReviews = useCallback((place: PetFriendlyPlace) => {
    setReviewingPlace(place);
    setIsReviewsOpen(true);
    setNewReviewRating(0);
    setNewReviewComment('');
  }, []);

  const handleAddReview = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingPlace || newReviewRating === 0) return;

    const placeId = getPlaceId(reviewingPlace);
    const newReview: Review = { rating: newReviewRating, comment: newReviewComment };
    
    setReviews(prevReviews => {
      const updatedReviews = {
        ...prevReviews,
        [placeId]: [...(prevReviews[placeId] || []), newReview]
      };
      localStorage.setItem('pet_friendly_reviews', JSON.stringify(updatedReviews));
      return updatedReviews;
    });

    setIsReviewsOpen(false);
    setReviewingPlace(null);
  }, [reviewingPlace, newReviewRating, newReviewComment]);
  
  const favoriteIds = useMemo(() => new Set(favorites.map(getPlaceId)), [favorites]);

  const sortedResults = useMemo(() => {
    let processedResults = [...results];
    
    // Add distance if location is available
    if(userLocation) {
        processedResults.forEach(place => {
            if(place.latitude && place.longitude) {
                place.distance = calculateDistance(userLocation.latitude, userLocation.longitude, place.latitude, place.longitude);
            }
        });
    }

    // Sort results
    switch(sortOrder) {
        case 'rating':
            processedResults.sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0));
            break;
        case 'distance':
            if (userLocation) {
                processedResults.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
            }
            break;
        default:
            // No sorting or initial order
            break;
    }

    return processedResults;
  }, [results, sortOrder, userLocation]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header onShowFavorites={() => setIsFavoritesOpen(true)} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">尋找您的下一個寵物友善好去處</h2>
          <p className="text-gray-600 mb-6">請選擇縣市、區域和地點類型，讓我們為您和您的毛小孩找到最棒的地點！</p>
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <ResultsList 
              results={sortedResults}
              visibleCount={visibleCount} 
              isLoading={isLoading} 
              error={error}
              hasSearched={hasSearched}
              onHoverPlace={setSelectedPlaceForMap}
              onToggleFavorite={handleToggleFavorite}
              onShowReviews={handleShowReviews}
              reviews={reviews}
              favoriteIds={favoriteIds}
              onLoadMore={handleLoadMore}
              hasMore={visibleCount < sortedResults.length}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              isLocationEnabled={!!userLocation}
            />
          </div>
          <div className="lg:col-span-2">
             {hasSearched && !error && (
              <Map city={searchedCity} place={selectedPlaceForMap} results={results} />
             )}
          </div>
        </div>
      </main>
      
      {/* Favorites Modal */}
      <Modal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} title="我的收藏">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-1">
            {favorites.map((place) => (
              <ResultCard 
                key={getPlaceId(place)} 
                place={place} 
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
                onShowReviews={handleShowReviews}
                reviews={reviews[getPlaceId(place)] || []}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">您尚未收藏任何地點。</p>
        )}
      </Modal>

      {/* Reviews Modal */}
      {reviewingPlace && (
        <Modal isOpen={isReviewsOpen} onClose={() => setIsReviewsOpen(false)} title={`"${reviewingPlace.name}" 的評論`}>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
            <h3 className="text-lg font-semibold border-b pb-2">新增您的評論</h3>
            <form onSubmit={handleAddReview} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">評分</label>
                <StarRating rating={newReviewRating} onRatingChange={setNewReviewRating} />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">評論</label>
                <textarea 
                  id="comment"
                  value={newReviewComment}
                  onChange={e => setNewReviewComment(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  placeholder="分享您的經驗..."
                />
              </div>
               <div className="flex flex-col gap-4">
                 <button type="submit" disabled={newReviewRating === 0} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400">
                    送出評論
                 </button>
                 <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(reviewingPlace.name + ' ' + reviewingPlace.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                   <img src="https://www.google.com/s2/favicons?domain=www.google.com&sz=16" alt="Google icon" className="w-4 h-4 mr-2" />
                    在 Google 上發表評論
                 </a>
                 <p className="text-xs text-gray-500 text-center">注意：在此提交的評論僅會顯示於本網站。若要分享到 Google，請點擊上方按鈕。</p>
               </div>
            </form>
            <div className="border-t pt-4 space-y-3">
              <h3 className="text-lg font-semibold">所有評論</h3>
              {(reviews[getPlaceId(reviewingPlace)] || []).length > 0 ? (
                reviews[getPlaceId(reviewingPlace)].map((review, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <StarRating rating={review.rating} readOnly />
                    <p className="text-gray-700 mt-1">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">這個地點還沒有任何評論。</p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;