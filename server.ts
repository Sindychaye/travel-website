import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    aiAvailable: !!apiKey,
    service: 'WanderAI Travel Concierge',
  });
});

// AI Chat Endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { messages, destination = 'Penang, Malaysia' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not yet configured
      const lastUserMsg = messages[messages.length - 1]?.text || '';
      return res.json({
        reply: generateLocalTravelAdvice(lastUserMsg, destination),
        source: 'curated-guide',
      });
    }

    // Prepare system instructions and conversation contents
    const systemInstruction = `You are WanderAI, an elite, worldly travel concierge and local Penang travel specialist. 
Your expertise spans Penang (George Town, Kek Lok Si, Penang Hill, Batu Ferringhi, authentic street hawker stalls, Peranakan heritage) and world destinations.
When responding:
1. Be warm, inspiring, and practically helpful.
2. Provide specific locations, local food specialties (e.g. Char Kway Teow, Penang Assam Laksa, Teochew Chendol, Nasi Kandar Line Clear), best visiting hours, and cultural etiquette.
3. For weather or packing questions, give concrete tropical climate advice (light breathable fabrics, umbrella/rain poncho, temple-appropriate attire covering knees and shoulders).
4. Use neat formatting with bullet points and bold highlights for readability.
Current destination focus: ${destination}.`;

    // Map conversation to Gemini contents
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I could not generate a response. Please try asking again!';
    res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    const lastUserMsg = req.body?.messages?.[req.body.messages.length - 1]?.text || '';
    const fallback = generateLocalTravelAdvice(lastUserMsg, req.body?.destination || 'Penang');
    res.json({ reply: fallback, source: 'curated-fallback', note: error?.message });
  }
});

// AI Itinerary Generation Endpoint
app.post('/api/gemini/itinerary', async (req: Request, res: Response) => {
  try {
    const {
      prompt,
      days = 3,
      destination = 'Penang, Malaysia',
      travelStyle = 'Balanced & Cultural',
      travelParty = 'Couples / Friends',
    } = req.body;

    if (!ai) {
      return res.json({
        itinerary: generateFallbackItinerary(prompt, days, destination),
        source: 'curated-guide',
      });
    }

    const systemInstruction = `You are an expert itinerary architect for WanderAI.
Generate a realistic, immersive day-by-day travel plan based on the user's travel preferences.
Destination: ${destination}
Duration: ${days} days
Style: ${travelStyle}
Travel Party: ${travelParty}

Ensure the itinerary is geographically logical (stops on the same day are in the same district or easily connected via Grab/transit), includes local street food and authentic spots, and specifies realistic times and transit estimates. Return JSON conforming strictly to the requested schema.`;

    const userPrompt = `Generate a ${days}-day itinerary for ${destination}.
Travel Request: "${prompt || `Explore the best of ${destination} with heritage, food, and scenic highlights`}".
Travel Style: ${travelStyle}.
Party: ${travelParty}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            destination: { type: Type.STRING },
            summary: { type: Type.STRING },
            estimatedBudget: { type: Type.STRING },
            bestSeason: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  theme: { type: Type.STRING },
                  description: { type: Type.STRING },
                  stops: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        time: { type: Type.STRING },
                        period: { type: Type.STRING, description: 'Morning, Midday, Afternoon, Evening, or Night' },
                        title: { type: Type.STRING },
                        category: { type: Type.STRING, description: 'Heritage, Food, Nature, Adventure, Beach, or Culture' },
                        description: { type: Type.STRING },
                        duration: { type: Type.STRING },
                        locationName: { type: Type.STRING },
                        transitInfo: { type: Type.STRING },
                        insiderTip: { type: Type.STRING },
                        coordinates: {
                          type: Type.OBJECT,
                          properties: {
                            lat: { type: Type.NUMBER },
                            lng: { type: Type.NUMBER },
                          },
                          required: ['lat', 'lng'],
                        },
                      },
                      required: ['id', 'time', 'period', 'title', 'category', 'description', 'duration', 'locationName'],
                    },
                  },
                },
                required: ['dayNumber', 'title', 'theme', 'description', 'stops'],
              },
            },
          },
          required: ['title', 'destination', 'summary', 'days'],
        },
      },
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);
    res.json({ itinerary: parsed, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating itinerary with Gemini:', error);
    const fallback = generateFallbackItinerary(
      req.body?.prompt,
      req.body?.days || 3,
      req.body?.destination || 'Penang, Malaysia'
    );
    res.json({ itinerary: fallback, source: 'curated-fallback', error: error?.message });
  }
});

// Helper curated travel response generator for fallback
function generateLocalTravelAdvice(prompt: string, destination: string): string {
  const q = prompt.toLowerCase();
  if (q.includes('weather') || q.includes('rain') || q.includes('climate')) {
    return `### 🌤️ Weather in Penang & Southeast Asia
Penang enjoys tropical sunshine year-round with temperatures averaging **28°C–32°C (82°F–90°F)**.
- **Current Season:** Warm & humid with occasional pleasant afternoon sea breezes.
- **Best Times to Explore Outdoors:** Early mornings (8:00 AM – 10:30 AM) and late afternoons (4:30 PM onwards) to avoid midday sun.
- **Tip:** Carry a light foldable umbrella or light poncho; brief tropical rain showers often pass within 30 minutes!`;
  }

  if (q.includes('pack') || q.includes('bring') || q.includes('clothes') || q.includes('shoes')) {
    return `### 🎒 Essential Packing Checklist for Penang
1. **Clothing:** Lightweight linen/cotton shirts, comfortable walking shorts, and breathable fabrics.
2. **Temple Attire:** A lightweight scarf or modest clothing covering shoulders and knees when visiting Kek Lok Si Temple or Kapitan Keling Mosque.
3. **Footwear:** Broken-in walking sneakers or supportive sandals for walking the George Town street art trails and Clan Jetties.
4. **Sun & Rain Gear:** High-SPF sunscreen, UV sunglasses, and a compact umbrella.
5. **Tech & Cash:** Power bank (plenty of photo ops!), universal UK Type-G plug adapter, and small Malaysian Ringgit (MYR) cash notes for street hawkers.`;
  }

  if (q.includes('food') || q.includes('eat') || q.includes('laksa') || q.includes('hawker') || q.includes('char kway')) {
    return `### 🍜 Penang Food Bucket List (Must-Eats!)
Penang is celebrated as the street food capital of the world. Here are legendary spots:
1. **Siam Road Charcoal Char Kway Teow:** Smoky wok hei with plump prawns and cockles. (Arrive by 11:30 AM).
2. **Penang Road Famous Teochew Chendol:** Ice-cold shaved ice with fragrant gula melaka and pandan jelly noodles.
3. **Air Itam Sister Curry Mee / Assam Laksa:** Savory, tangy fish broth noodles near the base of Kek Lok Si.
4. **Hameediyah Restaurant (Campbell St):** Founded in 1907, Malaysia's oldest Nasi Kandar. Try the spiced Murtabak and Mysore mutton.
5. **New Lane Hawker Centre:** Night street filled with grilled chicken wings, satay, and oyster omelets.`;
  }

  return `### 🏝️ Welcome to ${destination}!
Here are top insider recommendations to make your journey extraordinary:
- **Heritage Walk:** Start at **Armenian Street** in George Town for Ernest Zacharevic's mural art, stopping by **Chew Jetty** on the wooden waterfront.
- **Breathtaking Panoramas:** Take the funicular railway up **Penang Hill** and walk the **Habitat Canopy Walk** high above the rainforest.
- **Spiritual Majesty:** Visit **Kek Lok Si Temple**, the largest Buddhist temple in Malaysia, featuring the 30.2-meter bronze statue of Guanyin.
- **Evening Relaxation:** Catch the golden sunset at **Batu Ferringhi** beach followed by seaside seafood.

Would you like me to generate a personalized day-by-day itinerary or customize recommendations for food, beaches, or family fun?`;
}

// Fallback high-fidelity itinerary generator
function generateFallbackItinerary(prompt: string, days: number = 3, destination: string = 'Penang, Malaysia') {
  return {
    title: `Essential ${days}-Day Discovery of ${destination}`,
    destination: destination,
    summary: `A handcrafted journey through UNESCO heritage alleys, world-renowned street food hawkers, emerald rainforest peaks, and coastal sunset beaches.`,
    estimatedBudget: `RM 450 - RM 800 (~$100 - $180 USD) per person excluding flights`,
    bestSeason: `Year-round; November to April offers crisp skies`,
    days: [
      {
        dayNumber: 1,
        title: 'UNESCO Heritage & Legendary Hawker Trail',
        theme: 'Culture, Colonial Architecture & Street Gastronomy',
        description: 'Immerse yourself in George Town’s preserved Peranakan shophouses, iconic wall murals, and legendary culinary gems.',
        stops: [
          {
            id: 'd1-s1',
            time: '08:30 AM',
            period: 'Morning',
            title: 'Toh Soon Cafe & Armenian Street Murals',
            category: 'Food',
            description: 'Start with traditional charcoal-toasted Hainanese bread, soft-boiled kampung eggs, and iced kopi in Campbell Street alley before discovering Ernest Zacharevic’s street murals.',
            duration: '2 hours',
            locationName: 'Armenian St, George Town',
            transitInfo: 'Walking distance within heritage core',
            insiderTip: 'Arrive early at Toh Soon to beat the queue, then rent a classic trishaw.',
            coordinates: { lat: 5.4151, lng: 100.3377 },
          },
          {
            id: 'd1-s2',
            time: '11:00 AM',
            period: 'Morning',
            title: 'Pinang Peranakan Mansion',
            category: 'Heritage',
            description: 'Step inside an opulent 19th-century Baba-Nyonya courtyard home filled with over 1,000 antique heirlooms, mother-of-pearl carvings, and gold embroidery.',
            duration: '1.5 hours',
            locationName: 'Church Street, George Town',
            transitInfo: '7 min walk from Armenian St',
            insiderTip: 'Guided tours depart every 45 minutes and reveal fascinating courtyard architecture.',
            coordinates: { lat: 5.4178, lng: 100.3409 },
          },
          {
            id: 'd1-s3',
            time: '01:00 PM',
            period: 'Midday',
            title: 'Penang Road Famous Teochew Chendol & Assam Laksa',
            category: 'Food',
            description: 'Cool down with world-famous shaved ice topped with coconut milk and rich Gula Melaka, accompanied by sweet-sour mackerel Assam Laksa noodles.',
            duration: '1 hour',
            locationName: 'Lebuh Keng Kwee, George Town',
            transitInfo: '10 min walk or 3 min Grab ride',
            insiderTip: 'The laksa stall right beside the dessert cart has incredible wok aroma.',
            coordinates: { lat: 5.4171, lng: 100.3308 },
          },
          {
            id: 'd1-s4',
            time: '04:00 PM',
            period: 'Afternoon',
            title: 'Chew Jetty Waterfront Settlement',
            category: 'Culture',
            description: 'Walk the historic timber planks of the oldest clan waterfront village established by Chinese maritime immigrants in the 19th century.',
            duration: '1.5 hours',
            locationName: 'Weld Quay, George Town',
            transitInfo: '10 min walk back toward the sea',
            insiderTip: 'Respect residents’ private homes past the central boardwalk shops.',
            coordinates: { lat: 5.4127, lng: 100.3402 },
          },
          {
            id: 'd1-s5',
            time: '07:00 PM',
            period: 'Evening',
            title: 'Chulia Street & New Lane Hawker Feast',
            category: 'Food',
            description: 'Savor freshly fried Char Kway Teow with duck egg, sizzling chicken satay with peanut sauce, and crispy wanton mee under the neon lanterns.',
            duration: '2.5 hours',
            locationName: 'Chulia Street & New Lane',
            transitInfo: 'Short stroll or 5 min Grab ride',
            insiderTip: 'Order from multiple stalls and let them bring the dishes directly to your shared table.',
            coordinates: { lat: 5.4184, lng: 100.3366 },
          },
        ],
      },
      {
        dayNumber: 2,
        title: 'Misty Peaks & Sacred Sanctuary',
        theme: 'Rainforest Views, Historic Funicular & Sacred Temples',
        description: 'Ascend to the cool highland air of Penang Hill, traverse prehistoric canopy walkways, and marvel at Kek Lok Si Temple.',
        stops: [
          {
            id: 'd2-s1',
            time: '08:00 AM',
            period: 'Morning',
            title: 'Penang Hill Funicular & The Habitat Canopy Walk',
            category: 'Nature',
            description: 'Ride the high-speed funicular railway up 833 meters above sea level. Traverse the Curtis Crest Tree Top Walk for panoramic views of Penang Island and mainland Malaysia.',
            duration: '3 hours',
            locationName: 'Penang Hill, Bukit Bendera',
            transitInfo: '20 min Grab from George Town to Lower Station',
            insiderTip: 'Buy fast-lane tickets on weekends to bypass the funicular boarding queue.',
            coordinates: { lat: 5.4243, lng: 100.2694 },
          },
          {
            id: 'd2-s2',
            time: '12:30 PM',
            period: 'Midday',
            title: 'Air Itam Sister Curry Mee & Duck Blood Laksa',
            category: 'Food',
            description: 'Dine at the legendary roadside stall operated by the Lim sisters for over 70 years, serving coconut-curry noodles over hot charcoal pots.',
            duration: '1 hour',
            locationName: 'Air Itam Market Bridge',
            transitInfo: '10 min downhill Grab from Penang Hill base',
            insiderTip: 'Mix a spoonful of their house-roasted chili paste for authentic heat.',
            coordinates: { lat: 5.4012, lng: 100.2783 },
          },
          {
            id: 'd2-s3',
            time: '02:00 PM',
            period: 'Afternoon',
            title: 'Kek Lok Si Temple (Temple of Supreme Bliss)',
            category: 'Heritage',
            description: 'Marvel at Southeast Asia’s largest Buddhist temple complex, featuring the 7-tier Pagoda of Rama VI and the majestic 30-meter bronze statue of Kuan Yin.',
            duration: '2.5 hours',
            locationName: 'Air Itam, Penang',
            transitInfo: '5 min walk from Air Itam market',
            insiderTip: 'Ride the inclined lift to the Guan Yin pavilion for tranquil panoramic vistas.',
            coordinates: { lat: 5.3995, lng: 100.2736 },
          },
          {
            id: 'd2-s4',
            time: '06:30 PM',
            period: 'Evening',
            title: 'Gurney Drive Hawker Centre & Seafront Promenade',
            category: 'Food',
            description: 'Stroll the newly transformed Gurney Bay waterfront before tasting oyster omelets (Orh Jian), Rojak with crushed peanuts, and Pasembur Indian salad.',
            duration: '2 hours',
            locationName: 'Gurney Drive, George Town',
            transitInfo: '25 min Grab ride from Air Itam',
            insiderTip: 'Find stall #42 for Penang Rojak loaded with crunchy fritters and rose apple.',
            coordinates: { lat: 5.4398, lng: 100.3094 },
          },
        ],
      },
      {
        dayNumber: 3,
        title: 'Coastal Breezes & Tropical Adventures',
        theme: 'Beaches, Tropical Butterflies & Sunset Cocktails',
        description: 'Venture north to the coastal shores of Batu Ferringhi, discover tropical biodiversity, and unwind beside the Andaman Sea.',
        stops: [
          {
            id: 'd3-s1',
            time: '09:00 AM',
            period: 'Morning',
            title: 'Entopia by Penang Butterfly Farm & Tropical Spice Garden',
            category: 'Nature',
            description: 'Step into a giant glass conservatory housing over 15,000 free-flying butterflies, followed by aromatic spice trail walks in Teluk Bahang.',
            duration: '2.5 hours',
            locationName: 'Teluk Bahang, Penang',
            transitInfo: '35 min Grab ride from George Town along coastal scenic road',
            insiderTip: 'Wear bright floral colors — butterflies will gently land on your shoulders!',
            coordinates: { lat: 5.465, lng: 100.2185 },
          },
          {
            id: 'd3-s2',
            time: '01:00 PM',
            period: 'Midday',
            title: 'Seaside Nyonya Lunch in Batu Ferringhi',
            category: 'Food',
            description: 'Indulge in authentic Nyonya dishes like Curry Kapitan, Otak-Otak steamed in banana leaf, and Inche Kabin deep-fried chicken.',
            duration: '1.5 hours',
            locationName: 'Batu Ferringhi Coastal Road',
            transitInfo: '10 min Grab from Teluk Bahang',
            insiderTip: 'Ask for Sambal Belacan on the side for extra zest.',
            coordinates: { lat: 5.4746, lng: 100.2483 },
          },
          {
            id: 'd3-s3',
            time: '03:30 PM',
            period: 'Afternoon',
            title: 'Batu Ferringhi Beach & Water Sports',
            category: 'Beach',
            description: 'Relax on golden sands under swaying palm trees, try parasailing over the calm bay, or lounge at a beachside cafe with a fresh coconut.',
            duration: '2.5 hours',
            locationName: 'Batu Ferringhi Beach',
            transitInfo: 'Steps away from town center',
            insiderTip: 'Negotiate jet-ski or parasailing rates gently before boarding.',
            coordinates: { lat: 5.4762, lng: 100.2497 },
          },
          {
            id: 'd3-s4',
            time: '06:45 PM',
            period: 'Night',
            title: 'Sunset Beach Dining & Night Market Souvenirs',
            category: 'Beach',
            description: 'Watch the sun sink into the Malacca Strait with chilled drinks at Bora Bora by the Sea, followed by browsing hand-woven crafts at the night market.',
            duration: '2.5 hours',
            locationName: 'Bora Bora by the Sea, Batu Ferringhi',
            transitInfo: 'Direct beachfront access',
            insiderTip: 'Reserve a front-row beachfront daybed by 6:00 PM for the sunset view.',
            coordinates: { lat: 5.478, lng: 100.252 },
          },
        ],
      },
    ],
  };
}

// Dev & Production mode setup
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 WanderAI Server listening at http://localhost:${PORT}`);
  });
}

startServer();
