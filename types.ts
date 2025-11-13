export interface PetFriendlyPlace {
  name: string;
  address: string;
  description: string;
  latitude?: number;
  longitude?: number;
  google_rating?: number;
  distance?: number; // in kilometers
}

export interface District {
  name:string;
}

export interface City {
  name: string;
  districts: District[];
}

export interface Review {
  rating: number;
  comment: string;
}