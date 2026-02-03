export interface FlightDeal {
  id: string;
  destination: string;
  destinationCode: string;
  country: string;
  price: number;
  originalPrice: number;
  airline: string;
  departureDate: string;
  returnDate: string;
  stops: number;
  tier: 'exceptional' | 'great' | 'good';
  expiresAt: string;
}

export interface PriceHistory {
  date: string;
  price: number;
}

export interface RouteAnalytics {
  route: string;
  currentPrice: number;
  avgPrice: number;
  lowestPrice: number;
  priceChange: number;
  confidence: number;
  history: PriceHistory[];
}

export interface Destination {
  code: string;
  city: string;
  country: string;
  coordinates: [number, number];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  savings: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}
