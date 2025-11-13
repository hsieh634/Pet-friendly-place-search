import React, { useMemo } from 'react';
import { PetFriendlyPlace } from '../types';

interface MapProps {
    city: string;
    place: PetFriendlyPlace | null;
    results: PetFriendlyPlace[];
}

const Map: React.FC<MapProps> = ({ city, place, results }) => {
    const mapSrc = useMemo(() => {
        const baseUrl = 'https://www.google.com/maps?output=embed&q=';
        if (place && place.latitude && place.longitude) {
            return `${baseUrl}${place.latitude},${place.longitude}&z=15`;
        }
        if (results.length > 0 && results[0].latitude && results[0].longitude) {
             return `${baseUrl}${results[0].latitude},${results[0].longitude}&z=12`;
        }
        return `${baseUrl}${encodeURIComponent(city)}`;
    }, [city, place, results]);

    return (
        <div className="sticky top-8 h-96 lg:h-[calc(100vh-6rem)] w-full bg-gray-200 rounded-lg shadow-lg overflow-hidden">
            <iframe
                title="Pet-Friendly Locations Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapSrc}
                className="transition-opacity duration-300 ease-in-out"
                key={mapSrc} // Re-render iframe when src changes
            ></iframe>
        </div>
    );
};

export default Map;
