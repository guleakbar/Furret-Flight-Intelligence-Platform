// Mock flight data API
export interface Flight {
  id: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  price: number;
  originalPrice?: number;
  airline: string;
  duration: string;
  stops: number;
  departureTime: string;
  arrivalTime: string;
  dealQuality: 'exceptional' | 'great' | 'good';
  savings?: number;
  priceHistory?: { date: string; price: number }[];
}

// Mock data generator
const generateMockFlights = (): Flight[] => {
  const routes = [
    { from: 'KHI', to: 'DXB', fromCity: 'Karachi', toCity: 'Dubai' },
    { from: 'KHI', to: 'IST', fromCity: 'Karachi', toCity: 'Istanbul' },
    { from: 'KHI', to: 'BKK', fromCity: 'Karachi', toCity: 'Bangkok' },
    { from: 'KHI', to: 'LHR', fromCity: 'Karachi', toCity: 'London' },
    { from: 'KHI', to: 'SIN', fromCity: 'Karachi', toCity: 'Singapore' },
    { from: 'LHE', to: 'DXB', fromCity: 'Lahore', toCity: 'Dubai' },
    { from: 'ISB', to: 'LHR', fromCity: 'Islamabad', toCity: 'London' },
  ];

  const airlines = ['Emirates', 'PIA', 'Qatar Airways', 'Turkish Airlines', 'Etihad'];
  const dealQualities: ('exceptional' | 'great' | 'good')[] = ['exceptional', 'great', 'good'];

  return routes.flatMap((route, idx) => {
    return Array.from({ length: 3 }, (_, i) => {
      const basePrice = 200 + Math.random() * 500;
      const discount = dealQualities[i] === 'exceptional' ? 0.4 : dealQualities[i] === 'great' ? 0.25 : 0.15;
      const price = Math.round(basePrice * (1 - discount));
      
      return {
        id: `${route.from}-${route.to}-${i + 1}`,
        ...route,
        price,
        originalPrice: Math.round(basePrice),
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        duration: `${Math.floor(2 + Math.random() * 8)}h ${Math.floor(Math.random() * 60)}m`,
        stops: Math.floor(Math.random() * 2),
        departureTime: `${String(6 + i * 4).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        arrivalTime: `${String(10 + i * 4).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        dealQuality: dealQualities[i],
        savings: Math.round(basePrice * discount),
        priceHistory: Array.from({ length: 7 }, (_, d) => ({
          date: new Date(Date.now() - (6 - d) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          price: Math.round(price + (Math.random() - 0.5) * 100),
        })),
      };
    });
  });
};

const mockFlights = generateMockFlights();

export async function fetchFlights(params?: {
  from?: string;
  to?: string;
  dealQuality?: string;
}): Promise<Flight[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = mockFlights;

  if (params?.from) {
    filtered = filtered.filter(f => f.from.toLowerCase().includes(params.from!.toLowerCase()));
  }

  if (params?.to) {
    filtered = filtered.filter(f => f.to.toLowerCase().includes(params.to!.toLowerCase()));
  }

  if (params?.dealQuality && params.dealQuality !== 'all') {
    filtered = filtered.filter(f => f.dealQuality === params.dealQuality);
  }

  return filtered;
}

export async function fetchFlightById(id: string): Promise<Flight | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockFlights.find(f => f.id === id) || null;
}
