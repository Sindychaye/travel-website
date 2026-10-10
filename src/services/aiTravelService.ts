import { ItineraryPlan } from '../types/travel';
import { DEFAULT_PENANG_ITINERARY } from '../data/penangData';

export interface ChatApiMessage {
  role: 'user' | 'assistant';
  text: string;
}

export async function askGeminiAssistant(
  messages: ChatApiMessage[],
  destination: string = 'Penang, Malaysia'
): Promise<string> {
  try {
    const response = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        destination,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.reply || 'Here is what I found for your journey...';
  } catch (error) {
    console.warn('Backend chat API unavailable, falling back to local travel intelligence:', error);
    const lastMsg = messages[messages.length - 1]?.text || '';
    return generateLocalFallbackAdvice(lastMsg, destination);
  }
}

export async function generateGeminiItinerary(
  prompt: string,
  days: number = 3,
  destination: string = 'Penang, Malaysia',
  travelStyle: string = 'Balanced & Cultural',
  travelParty: string = 'Couples / Friends'
): Promise<ItineraryPlan> {
  try {
    const response = await fetch('/api/gemini/itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        days,
        destination,
        travelStyle,
        travelParty,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.itinerary && data.itinerary.days && data.itinerary.days.length > 0) {
      return data.itinerary;
    }
    throw new Error('Invalid itinerary format returned from backend');
  } catch (error) {
    console.warn('Backend itinerary API unavailable, using tailored local generator:', error);
    return adaptFallbackItinerary(prompt, days, destination, travelStyle);
  }
}

function generateLocalFallbackAdvice(query: string, destination: string): string {
  const q = query.toLowerCase();
  if (q.includes('weather') || q.includes('rain')) {
    return `### 🌤️ Penang Weather Today\nPenang has a tropical marine climate with an average temperature of **29°C (84°F)**.\n- **Morning:** Pleasant sunshine, ideal for George Town street art and outdoor walks.\n- **Midday:** High UV (31°C–33°C); great time for air-conditioned museums or cafe hopping.\n- **Late Afternoon:** Refreshing coastal breeze along Batu Ferringhi with brief 20-minute showers possible.\n- **Recommendation:** Light linen fabrics, sunglasses, and a compact umbrella!`;
  }
  if (q.includes('pack') || q.includes('bring')) {
    return `### 🎒 Essential Packing Checklist for Penang\n- **Clothing:** Breathable light cotton/linen garments, walking shorts.\n- **Temple Attire:** Scarf or pants covering knees & shoulders (required for Kek Lok Si & Kapitan Keling).\n- **Footwear:** Cushioned walking sneakers for heritage trails, slip-on sandals for temples & beach.\n- **Sun & Rain:** SPF 50+ sunscreen, UV sunglasses, and a mini umbrella.\n- **Tech & Cash:** UK Type-G plug adapter, power bank, and Malaysian Ringgit (MYR) cash notes for street hawkers.`;
  }
  if (q.includes('food') || q.includes('eat') || q.includes('laksa') || q.includes('michelin')) {
    return `### 🍜 Penang Street Food Hall of Fame\n1. **Siam Road Char Kway Teow:** Charcoal-fired flat noodles with giant cockles and duck egg.\n2. **Penang Road Famous Teochew Chendol:** Hand-made pandan jelly with icy rich coconut milk and Gula Melaka.\n3. **Air Itam Sister Curry Mee:** Charcoal-simmered rich coconut curry noodles by the famous Lim sisters.\n4. **Hameediyah Restaurant (1907):** Malaysia's oldest Nasi Kandar; order spiced chicken and Murtabak.\n5. **Gurney Drive Hawkers:** Crispy oyster omelets (Orh Jian) and Pasembur salad by the seafront.`;
  }
  return `### ✈️ Travel Concierge Advice for ${destination}\nPenang is an intoxicating blend of colonial heritage, culinary genius, and lush tropical beauty.\n- **Must-See Highlights:** George Town street murals, Kek Lok Si Temple, Penang Hill funicular & canopy walk, and Batu Ferringhi beach.\n- **Getting Around:** Grab rides are super affordable (RM 6 - 25 across most island destinations).\n- **Local Phrase:** Say *"Terima Kasih"* (Thank you) or *"Kam Sia"* in Penang Hokkien!`;
}

function adaptFallbackItinerary(
  prompt: string,
  days: number,
  destination: string,
  travelStyle: string
): ItineraryPlan {
  // If requesting 1 or 2 days, slice default itinerary; if 4-5 days, add extra curated days
  const base = JSON.parse(JSON.stringify(DEFAULT_PENANG_ITINERARY)) as ItineraryPlan;
  base.destination = destination;
  base.title = `${days}-Day ${travelStyle} Experience in ${destination}`;
  base.summary = `Customized itinerary tailored to "${prompt || travelStyle}" highlighting prime heritage, culinary marvels, and scenic routes.`;

  if (days <= 3) {
    base.days = base.days.slice(0, days);
    return base;
  }

  // If 4 or 5 days requested, add realistic extended Penang exploration
  const extraDay4 = {
    dayNumber: 4,
    title: 'Hidden Balik Pulau & Durian Orchards',
    theme: 'Countryside Villages, Nutmeg Groves & Sunset Fishing Villages',
    description: 'Escape to the quiet western coast of Penang Island to discover rustic fishing piers, goat farms, and scenic rural trails.',
    stops: [
      {
        id: 'p-d4-1',
        time: '09:00 AM',
        period: 'Morning' as const,
        title: 'Balik Pulau Countryside Cycling & Nutmeg Farm',
        category: 'Nature & Rural',
        description: 'Rent a bicycle through paddy fields and visit the Ghee Hup Nutmeg Factory to taste freshly processed nutmeg syrups and dried snacks.',
        duration: '2.5 hours',
        locationName: 'Balik Pulau Rural Valley',
        transitInfo: '35 min scenic mountain drive from George Town',
        insiderTip: 'Try the fresh nutmeg juice with sour plum for an instant pick-me-up.',
        coordinates: { lat: 5.3514, lng: 100.2372 }
      },
      {
        id: 'p-d4-2',
        time: '12:30 PM',
        period: 'Midday' as const,
        title: 'Kim Laksa Siam & Balik Pulau Brown Sugar Pau',
        category: 'Food',
        description: 'Dine at Kim Laksa for rich, creamy Siamese Laksa with coconut milk, followed by traditional steamed buns filled with coconut brown sugar.',
        duration: '1.5 hours',
        locationName: 'Jalan Tun Sardon, Balik Pulau',
        transitInfo: '5 min ride within Balik Pulau town',
        insiderTip: 'Try mixing half asam laksa with half siam laksa for the "Kah-win" combination!',
        coordinates: { lat: 5.352, lng: 100.239 }
      },
      {
        id: 'p-d4-3',
        time: '04:30 PM',
        period: 'Afternoon' as const,
        title: 'Teluk Bahang National Park & Monkey Beach',
        category: 'Adventure',
        description: 'Hike or take a boat from the national park jetty to secluded Monkey Beach under ancient coastal dipterocarp trees.',
        duration: '3 hours',
        locationName: 'Penang National Park',
        transitInfo: '25 min coastal drive heading north',
        insiderTip: 'Keep all snacks inside your backpack as wild macaque monkeys are curious.',
        coordinates: { lat: 5.4604, lng: 100.2078 }
      }
    ]
  };

  base.days.push(extraDay4);
  return base;
}
