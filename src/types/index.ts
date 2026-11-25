export type TravelStyle =
  | "Budget"
  | "Luxury"
  | "Adventure"
  | "Romantic"
  | "Family"
  | "Solo"
  | "Cultural"
  | "Relaxation"
  | "Backpacking"
  | "Nature and wildlife"
  | "Mountains"
  | "Beaches";

export type TravelPace = "Relaxed" | "Moderate" | "Intensive";

export interface TripPreferences {
  startingLocation: string;
  destination: string;
  startDate: string;
  endDate: string;
  flexibleDates: boolean;
  durationDays?: number;
  travelers: number;
  adults: number;
  children: number;
  budget: number;
  currency: string;
  travelStyle: TravelStyle;
  accommodationPreference: string;
  foodPreference: string;
  transportPreference: string;
  preferredActivities: string[];
  travelPace: TravelPace;
  specialRequirements?: string;
  rawPrompt?: string;
}

export interface ActivityItem {
  id: string;
  timeSlot: "morning" | "afternoon" | "evening";
  title: string;
  description: string;
  location?: string;
  estimatedCost?: number;
  duration?: string;
  tags?: string[];
}

export interface DayItinerary {
  day: number;
  date?: string;
  title: string;
  location: string;
  morning: string;
  afternoon: string;
  evening: string;
  activities: ActivityItem[];
  attractions: string[];
  restaurants: string[];
  estimatedDailyCost: number;
  travelTime?: string;
  image?: string;
}

export interface CostBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  other: number;
}

export interface AIPackageOption {
  id: string;
  packageType: "Economy" | "Comfort" | "Premium";
  packageName: string;
  tagline: string;
  description: string;
  destinationOverview: string;
  durationDays: number;
  estimatedBudget: number;
  currency: string;
  costBreakdown: CostBreakdown;
  accommodation: {
    type: string;
    hotelSuggestions: string[];
    description: string;
    amenities: string[];
  };
  highlights: string[];
  itinerary: DayItinerary[];
  transportation: {
    mode: string;
    details: string;
    estimatedCost: number;
  };
  travelTips: string[];
  packingChecklist: string[];
  assumptions: string[];
  warnings: string[];
  heroImage?: string;
}

export interface AIGeneratedTripResponse {
  tripId: string;
  tripOverview: {
    destination: string;
    country: string;
    durationDays: number;
    bestTimeToVisit: string;
    currency: string;
    startingLocation: string;
  };
  packages: {
    economy: AIPackageOption;
    comfort: AIPackageOption;
    premium: AIPackageOption;
  };
  createdAt: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  gallery: string[];
  coordinates: [number, number]; // [lat, lng]
  bestSeason: string;
  idealDuration: string;
  startingPrice: number;
  currency: string;
  category: TravelStyle[];
  highlights: string[];
  attractions: { name: string; description: string; image: string }[];
  localExperiences: string[];
  cuisine: string[];
  stayRecommendations: { name: string; type: string; priceRange: string }[];
  travelTips: string[];
  weather: {
    temp: string;
    condition: string;
    humidity: string;
    bestMonths: string;
  };
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  durationDays: number;
  price: number;
  originalPrice?: number;
  currency: string;
  category: TravelStyle;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  heroImage: string;
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerarySummary: { day: number; title: string; desc: string }[];
}

export interface BookingRequest {
  id: string;
  packageId?: string;
  packageTitle: string;
  destination: string;
  selectedTier?: "Economy" | "Comfort" | "Premium";
  travelers: number;
  startDate: string;
  endDate: string;
  totalEstimatedPrice: number;
  currency: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests?: string;
  status: "pending" | "confirmed" | "contacted";
  createdAt: string;
}
