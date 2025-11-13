import React from 'react';
import { PetFriendlyPlace, Review } from '../types';
import ResultCard from './ResultCard';
import EnhancedLoadingState from './EnhancedLoadingState';

interface ResultsListProps {
  results: PetFriendlyPlace[];
  visibleCount: number;
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  onHoverPlace: (place: PetFriendlyPlace | null) => void;
  onToggleFavorite: (place: PetFriendlyPlace) => void;
  onShowReviews: (place: PetFriendlyPlace) => void;
  reviews: Record<string, Review[]>;
  favoriteIds: Set<string>;
  onLoadMore: () => void;
  hasMore: boolean;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
  isLocationEnabled: boolean;
}

const getPlaceId = (place: PetFriendlyPlace) => `${place.name}-${place.address}`;

const EmptyState: React.FC = () => (
    <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">準備好開始探險了嗎？</h3>
        <p className="mt-1 text-sm text-gray-500">
            請在上方選擇您想查詢的條件，我們將為您尋找寵物友善的好去處。
        </p>
    </div>
);

const NoResults: React.FC = () => (
     <div className="text-center p-12 bg-yellow-50 rounded-lg border-2 border-dashed border-yellow-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">喔喔！找不到符合的地點</h3>
        <p className="mt-1 text-sm text-gray-500">
            請嘗試更換搜尋條件，或擴大搜尋範圍看看。
        </p>
    </div>
)

const ControlsBar: React.FC<Pick<ResultsListProps, 'sortOrder' | 'onSortOrderChange' | 'isLocationEnabled'>> =
({ sortOrder, onSortOrderChange, isLocationEnabled }) => {
    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 justify-end">
            <div className="flex-shrink-0 w-full sm:w-auto flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">排序:</label>
                <select
                    id="sort"
                    value={sortOrder}
                    onChange={(e) => onSortOrderChange(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                    <option value="default">預設</option>
                    <option value="rating">Google 評分</option>
                    <option
                        value="distance"
                        disabled={!isLocationEnabled}
                        className={!isLocationEnabled ? 'text-gray-400' : ''}
                        title={!isLocationEnabled ? "請開啟位置權限以使用此功能" : ""}
                    >
                        距離最近
                    </option>
                </select>
                 {!isLocationEnabled && (
                    <div className="group relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.636-1.21 2.242-1.21 2.878 0l5.397 10.26c.636 1.21-.242 2.641-1.439 2.641H4.299c-1.197 0-2.075-1.431-1.439-2.64L8.257 3.099zM10 13a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 011-1h.008a1 1 0 011 1v2.008a1 1 0 01-1 1h-.008a1 1 0 01-1-1V9z" clipRule="evenodd" />
                        </svg>
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            距離排序已停用。請在瀏覽器中允許位置存取權限。
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}


const ResultsList: React.FC<ResultsListProps> = (props) => {
  const { results, visibleCount, isLoading, error, hasSearched, onHoverPlace, onToggleFavorite, onShowReviews, reviews, favoriteIds, onLoadMore, hasMore, sortOrder, onSortOrderChange, isLocationEnabled } = props;

  if (isLoading) {
    return <EnhancedLoadingState />;
  }

  if (error) {
    return <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</div>;
  }
  
  if (!hasSearched) {
      return <EmptyState />;
  }

  if (results.length === 0) {
    return <NoResults />;
  }

  return (
    <>
      <ControlsBar 
          sortOrder={sortOrder}
          onSortOrderChange={onSortOrderChange}
          isLocationEnabled={isLocationEnabled}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.slice(0, visibleCount).map((place) => {
          const placeId = getPlaceId(place);
          return (
            <div 
              key={placeId}
              onMouseEnter={() => onHoverPlace(place)}
              onMouseLeave={() => onHoverPlace(null)}
            >
              <ResultCard 
                  place={place} 
                  isFavorite={favoriteIds.has(placeId)}
                  onToggleFavorite={onToggleFavorite}
                  onShowReviews={onShowReviews}
                  reviews={reviews[placeId] || []}
              />
            </div>
          )
        })}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
            <button
                onClick={onLoadMore}
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
                載入更多
            </button>
        </div>
      )}
    </>
  );
};

export default ResultsList;