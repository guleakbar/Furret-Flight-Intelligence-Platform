import { FlightDeal, RouteAnalytics, Testimonial, Destination } from '../types';

export const destinations: Destination[] = [
  { code: 'DXB', city: 'Dubai', country: 'UAE', coordinates: [55.2708, 25.2048] },
  { code: 'IST', city: 'Istanbul', country: 'Turkey', coordinates: [28.9784, 41.0082] },
  { code: 'LHR', city: 'London', country: 'UK', coordinates: [-0.1276, 51.5074] },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', coordinates: [100.5018, 13.7563] },
  { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', coordinates: [101.6869, 3.139] },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', coordinates: [103.8198, 1.3521] },
  { code: 'JED', city: 'Jeddah', country: 'Saudi Arabia', coordinates: [39.1925, 21.4858] },
  { code: 'DOH', city: 'Doha', country: 'Qatar', coordinates: [51.1839, 25.2854] },
];

export const generateMockDeals = (): FlightDeal[] => {
  const airlines = ['Emirates', 'Qatar Airways', 'Turkish Airlines', 'Etihad', 'PIA', 'Saudia', 'Oman Air'];
  const tiers: ('exceptional' | 'great' | 'good')[] = ['exceptional', 'great', 'good'];
  
  return destinations.slice(0, 6).map((dest, index) => {
    const basePrice = 300 + Math.random() * 800;
    const discount = tiers[index % 3] === 'exceptional' ? 0.5 : tiers[index % 3] === 'great' ? 0.35 : 0.2;
    const price = Math.round(basePrice * (1 - discount));
    const originalPrice = Math.round(basePrice);
    
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + 15 + Math.floor(Math.random() * 45));
    
    const returnDate = new Date(departureDate);
    returnDate.setDate(returnDate.getDate() + 5 + Math.floor(Math.random() * 10));
    
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2 + Math.floor(Math.random() * 22));
    
    return {
      id: `deal-${index}`,
      destination: dest.city,
      destinationCode: dest.code,
      country: dest.country,
      price,
      originalPrice,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      departureDate: departureDate.toISOString().split('T')[0],
      returnDate: returnDate.toISOString().split('T')[0],
      stops: Math.random() > 0.6 ? 0 : 1,
      tier: tiers[index % 3],
      expiresAt: expiresAt.toISOString(),
    };
  });
};

export const generatePriceHistory = (days: number = 30): { date: string; price: number }[] => {
  const history: { date: string; price: number }[] = [];
  const basePrice = 450;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const trend = Math.sin(i / 5) * 100;
    const noise = (Math.random() - 0.5) * 80;
    const price = Math.max(250, Math.round(basePrice + trend + noise));
    
    history.push({
      date: date.toISOString().split('T')[0],
      price,
    });
  }
  
  return history;
};

export const generateRouteAnalytics = (): RouteAnalytics[] => {
  const routes = [
    { route: 'KHI → DXB', currentPrice: 285 },
    { route: 'KHI → IST', currentPrice: 420 },
    { route: 'KHI → BKK', currentPrice: 380 },
    { route: 'KHI → LHR', currentPrice: 650 },
  ];
  
  return routes.map(({ route, currentPrice }) => ({
    route,
    currentPrice,
    avgPrice: Math.round(currentPrice * 1.3),
    lowestPrice: Math.round(currentPrice * 0.85),
    priceChange: Math.round((Math.random() - 0.5) * 20),
    confidence: 75 + Math.floor(Math.random() * 20),
    history: generatePriceHistory(30),
  }));
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    role: 'Business Consultant',
    avatar: 'AK',
    content: 'Furret saved me over PKR 80,000 on my Dubai trip. The price alerts are incredibly accurate!',
    savings: 'PKR 80,000',
  },
  {
    id: '2',
    name: 'Sarah Malik',
    role: 'Travel Blogger',
    avatar: 'SM',
    content: 'As someone who flies frequently, Furret has become indispensable. The AI predictions are spot on.',
    savings: 'PKR 150,000+',
  },
  {
    id: '3',
    name: 'Omar Farooq',
    role: 'Software Engineer',
    avatar: 'OF',
    content: 'Found a deal to Istanbul at 40% off regular price. The platform pays for itself many times over.',
    savings: 'PKR 65,000',
  },
];
