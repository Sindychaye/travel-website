export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  category: 'heritage' | 'food' | 'nature' | 'beach' | 'culture';
  categoryLabel: string;
  description: string;
  extendedDescription: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  admissionFee: string;
  suggestedDuration: string;
  bestTimeToVisit: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  mustTryEats?: string[];
  insiderTip: string;
  featured?: boolean;
}

export interface ItineraryStop {
  id: string;
  time: string;
  period: 'Morning' | 'Midday' | 'Afternoon' | 'Evening' | 'Night';
  title: string;
  category: string;
  description: string;
  duration: string;
  locationName: string;
  transitInfo?: string;
  insiderTip?: string;
  costEstimate?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  description: string;
  stops: ItineraryStop[];
}

export interface ItineraryPlan {
  title: string;
  destination: string;
  summary: string;
  estimatedBudget?: string;
  bestSeason?: string;
  days: ItineraryDay[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  quickActions?: {
    label: string;
    actionType: 'prompt' | 'view_itinerary' | 'view_destinations' | 'show_weather' | 'show_packing';
    payload?: string;
  }[];
}

export type TravelStyle = 'Balanced & Cultural' | 'Foodie & Street Hawkers' | 'Scenic & Relaxed' | 'Adventure & Nature' | 'Luxury & Boutique';
export type TravelParty = 'Solo Traveler' | 'Couple / Romantic' | 'Family with Kids' | 'Friends Getaway';
