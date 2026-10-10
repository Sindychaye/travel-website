import { Destination, ItineraryPlan } from '../types/travel';

export const PENANG_DESTINATIONS: Destination[] = [
  {
    id: 'george-town-street-art',
    name: 'George Town UNESCO Heritage & Street Art',
    subtitle: 'Living museum of colonial shophouses and murals',
    category: 'heritage',
    categoryLabel: 'Heritage & Art',
    description: 'Wander through cobblestone alleys filled with world-renowned interactive murals by Ernest Zacharevic, wrought-iron caricatures, and centuries-old shophouses.',
    extendedDescription: 'Inscribed as a UNESCO World Heritage site in 2008, George Town represents a multicultural living heritage where Chinese clan houses, Indian mosques, colonial banks, and Peranakan villas coexist harmoniously. The street art trail blends whimsy with local history.',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 3820,
    admissionFee: 'Free (Public streets)',
    suggestedDuration: '3 - 4 hours',
    bestTimeToVisit: 'Early morning (08:00 - 10:30 AM) or late afternoon to avoid the tropical midday sun',
    address: 'Armenian Street & Lebuh Cannon, 10200 George Town, Penang',
    coordinates: { lat: 5.4151, lng: 100.3377 },
    highlights: [
      'Iconic "Kids on Bicycle" mural on Armenian Street',
      'Artisan craft shops and traditional paper umbrella artisans',
      'Khoo Kongsi clan house courtyard just steps away',
      'Heritage coffee stops with charcoal-roasted kopi'
    ],
    mustTryEats: ['Toh Soon Cafe Charcoal Toast', 'Lebuh Cannon Ice Balls', 'Edelweiss Nyonya Kueh'],
    insiderTip: 'Rent a traditional trishaw for 1 hour (around RM 50) for great photos and stories from elder local drivers.',
    featured: true
  },
  {
    id: 'kek-lok-si-temple',
    name: 'Kek Lok Si Temple (Temple of Supreme Bliss)',
    subtitle: 'The largest Buddhist temple sanctuary in Malaysia',
    category: 'culture',
    categoryLabel: 'Spiritual Landmark',
    description: 'An architectural wonder perched atop Crane Hill, featuring the 7-tier Pagoda of 10,000 Buddhas and the towering 30.2-meter bronze statue of Kuan Yin.',
    extendedDescription: 'Commenced in 1891, Kek Lok Si combines Mahayana, Theravada, and traditional Chinese architecture. The temple grounds ascend in tiers with turtle liberation ponds, grand prayer halls, and colorful octagonal pagodas overlooking George Town.',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80', // replacement below with temple
    rating: 4.8,
    reviewCount: 4210,
    admissionFee: 'Free entry; Pagoda & Incline Lift RM 3 - 6',
    suggestedDuration: '2.5 - 3 hours',
    bestTimeToVisit: 'Morning 08:30 AM before tour buses, or Chinese New Year evenings when 200,000 lanterns illuminate the hill',
    address: 'Tingkat Lembah Ria 1, 11500 Ayer Itam, Penang',
    coordinates: { lat: 5.3995, lng: 100.2736 },
    highlights: [
      'Pagoda of Rama VI blending Chinese, Thai, and Burmese architecture',
      '30.2m Bronze Guanyin (Goddess of Mercy) under an ornate octagonal pavilion',
      'Sacred Tortoise Liberation Pond with hundreds of freshwater turtles',
      'Panoramic vantage point over Penang island'
    ],
    mustTryEats: ['Air Itam Sister Curry Mee at the base bridge', 'Famous Air Itam Assam Laksa'],
    insiderTip: 'Dress respectfully (knees and shoulders covered). Ride the cable lift up to the Guan Yin statue to save energy for the steps.',
    featured: true
  },
  {
    id: 'penang-hill-habitat',
    name: 'Penang Hill & The Habitat Rainforest',
    subtitle: 'Cool mountain breezes & prehistoric 130-million-year-old jungle',
    category: 'nature',
    categoryLabel: 'Highlands & Nature',
    description: 'Escape the heat aboard one of the world’s steepest funicular railways. Walk the Curtis Crest Tree Top Walk for 360-degree vistas across Penang.',
    extendedDescription: 'Rising 833 meters above sea level, Bukit Bendera (Penang Hill) was established as a British colonial retreat in the late 18th century. Today, it hosts The Habitat, an eco-park nestled within a 130-million-year-old virgin rainforest inhabited by dusky leaf monkeys, giant black squirrels, and flying lemurs.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewCount: 3100,
    admissionFee: 'Funicular: RM 15 - 30; The Habitat: RM 60',
    suggestedDuration: '3.5 - 4 hours',
    bestTimeToVisit: 'Early morning for mist clearing, or 5:30 PM for sunset golden hour over George Town',
    address: 'Jalan Stesen Bukit Bendera, 11500 Air Itam, Penang',
    coordinates: { lat: 5.4243, lng: 100.2694 },
    highlights: [
      'High-speed Swiss-engineered funicular railway gliding through tunnels',
      'Curtis Crest Tree Top Walk (highest public viewing point on Penang Island)',
      'Langur Way Canopy Walk hanging 40 meters above the forest floor',
      'Kopi Hutan: rustic forest cafe serving freshly ground specialty coffees'
    ],
    mustTryEats: ['High tea at David Brown’s Restaurant on Strawberry Hill', 'Iced Wild Berry Tea at Kopi Hutan'],
    insiderTip: 'On weekends, buy the Fast Lane ticket to avoid waiting in the 60+ minute funicular queue.',
    featured: true
  },
  {
    id: 'batu-ferringhi-beach',
    name: 'Batu Ferringhi Coastal Beach',
    subtitle: 'Golden sands, water sports, and sunset seaside dining',
    category: 'beach',
    categoryLabel: 'Beaches & Leisure',
    description: 'Penang’s premier beach strip with golden shores, thrilling parasailing over the Andaman Sea, resort living, and an energetic night bazaar.',
    extendedDescription: 'Located on the north coast, Batu Ferringhi offers a resort sanctuary lined with casuarina trees. By day, water sport operators offer jet skiing and catamaran sailing. As sunset descends, the beachfront bars ignite with music and the night market awakens with artisan crafts and local street snacks.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 2840,
    admissionFee: 'Free public beach access',
    suggestedDuration: '3 - 5 hours',
    bestTimeToVisit: 'Late afternoon (04:30 PM) through late evening',
    address: 'Jalan Batu Ferringhi, 11100 Batu Ferringhi, Penang',
    coordinates: { lat: 5.4762, lng: 100.2497 },
    highlights: [
      'Unobstructed sunset views over the Straits of Malacca',
      'Parasailing and stand-up paddleboarding with trained guides',
      'Vibrant Batu Ferringhi Night Market stretching for 1 kilometer',
      'Seaside cocktail lounges with bean bags right on the sand'
    ],
    mustTryEats: ['Grilled tiger prawns at Bora Bora', 'Long Beach Food Court satay & seafood mee goreng'],
    insiderTip: 'Always check jellyfish warning flags before swimming, or opt for resort infinity pools.',
    featured: true
  },
  {
    id: 'pinang-peranakan-mansion',
    name: 'Pinang Peranakan Mansion',
    subtitle: 'Emerald green jewel of Baba-Nyonya aristocratic heritage',
    category: 'heritage',
    categoryLabel: 'Heritage Palace',
    description: 'A lavish 19th-century courtyard mansion showcasing the opulent lifestyle, customs, and craftsmanship of the Peranakan Chinese diaspora.',
    extendedDescription: 'Once the residence and office of Kapitan Cina Chung Keng Quee, this magnificent green mansion combines Chinese carved wood panels with English floor tiles and Scottish ironworks. It houses over 1,000 museum-grade antiquities, gold jewelry, and beaded slippers.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewCount: 2950,
    admissionFee: 'RM 25 (Adult), RM 12 (Child)',
    suggestedDuration: '1.5 - 2 hours',
    bestTimeToVisit: '10:00 AM or 02:00 PM when complimentary guided tours run',
    address: '29, Church Street, 10200 George Town, Penang',
    coordinates: { lat: 5.4178, lng: 100.3409 },
    highlights: [
      'Opulent central open-air atrium with intricate gilded woodwork',
      'Museum of Straits Chinese jewelry, porcelain, and ceremonial bridal wear',
      'Private ancestral temple with carved altar deities',
      'Filming location for "Crazy Rich Asians" and international period dramas'
    ],
    mustTryEats: ['Auntie Gaik Lean’s Old School Eatery (Michelin 1-star Nyonya) nearby on Bishop St'],
    insiderTip: 'Photography is fully allowed inside! Capture the sunlight beaming through the courtyard glass panes.',
    featured: false
  },
  {
    id: 'clan-jetties-weld-quay',
    name: 'Clan Jetties of Penang (Weld Quay)',
    subtitle: 'Historic Chinese waterfront villages built on wooden stilts',
    category: 'culture',
    categoryLabel: 'Living Culture',
    description: 'Six remaining 19th-century wooden stilt settlements extending over the sea, each belonging to a distinct Chinese clan lineage.',
    extendedDescription: 'Established by immigrant dock laborers from Fujian province during the British colonial maritime boom, each jetty is governed by a distinct family clan (Chew, Tan, Lee, Yeoh, Koay, and Mixed Clans). Chew Jetty remains the most lively and visited settlement.',
    imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    reviewCount: 2200,
    admissionFee: 'Free',
    suggestedDuration: '1 - 1.5 hours',
    bestTimeToVisit: 'Late afternoon around 05:00 PM for calm sea breezes and twilight reflections',
    address: 'Chew Jetty, Weld Quay, 10300 George Town, Penang',
    coordinates: { lat: 5.4127, lng: 100.3402 },
    highlights: [
      'Chew Jetty wooden walkway flanked by fisherman shrines and houses',
      'Fascinating view of Penang port and ferries crossing to Butterworth',
      'Traditional handmade snacks like deep-fried durian and salted egg crisps',
      'Authentic maritime shrine at the end of the wooden pier'
    ],
    mustTryEats: ['Durian puff ice cream at Chew Jetty entrance', 'Fresh big head prawn noodles at nearby Weld Quay stalls'],
    insiderTip: 'Please keep your voice low and do not peer into open doorways, as families live here daily.',
    featured: false
  },
  {
    id: 'gurney-drive-hawker',
    name: 'Gurney Drive & Gurney Bay Promenade',
    subtitle: 'The epicenter of world-class Malaysian street gastronomy',
    category: 'food',
    categoryLabel: 'Street Food Hub',
    description: 'Famous seafront dining district where hawkers prepare smoky Char Kway Teow, tangy Assam Laksa, crispy oyster omelets, and grilled satay under open skies.',
    extendedDescription: 'No trip to Penang is complete without a culinary expedition to Gurney Drive. The adjacent newly landscaped Gurney Bay adds lush coastal gardens, skateparks, and a breezy waterfront promenade overlooking the sea.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewCount: 3980,
    admissionFee: 'Free (Food stalls pay-as-you-order)',
    suggestedDuration: '2 hours',
    bestTimeToVisit: '06:30 PM - 09:30 PM for maximum stall vitality and cool evening air',
    address: '172, Solok Gurney 1, 10250 George Town, Penang',
    coordinates: { lat: 5.4398, lng: 100.3094 },
    highlights: [
      'Over 80 specialty food stalls with multi-generational secret recipes',
      'Char Kway Teow wok hei sizzle with duck egg and Chinese sausage',
      'Freshly assembled Penang Pasembur (Mamaks salad) drizzled with sweet nutty gravy',
      'New Gurney Bay coastal jogging track and art installations'
    ],
    mustTryEats: ['Oyster Omelet (Orh Jian)', 'Penang Assam Laksa', 'Bak Kut Teh herbal soup', 'Apom Manis pancakes'],
    insiderTip: 'Take a table first, note your table number, and give it to each stall vendor when ordering so they can deliver straight to you.',
    featured: true
  },
  {
    id: 'entopia-butterfly-farm',
    name: 'Entopia by Penang Butterfly Farm',
    subtitle: 'Tropical living sanctuary of 15,000 butterflies & insect wonders',
    category: 'nature',
    categoryLabel: 'Nature Sanctuary',
    description: 'A magical vivarium and glass dome where thousands of exotic butterflies flutter freely among cascading waterfalls and lush orchids.',
    extendedDescription: 'One of the first butterfly sanctuaries in tropical Asia, Entopia features The Natureland (a living outdoor garden with 15,000 free-flying butterflies and flora) and The Cocoon (an interactive discovery center with high-tech education on insect life cycles).',
    imageUrl: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewCount: 1890,
    admissionFee: 'RM 69 (Adult), RM 49 (Child)',
    suggestedDuration: '2 - 3 hours',
    bestTimeToVisit: '09:30 AM to 11:30 AM when butterflies are most active in morning warmth',
    address: 'No. 830, Jalan Teluk Bahang, 11050 Teluk Bahang, Penang',
    coordinates: { lat: 5.465, lng: 100.2185 },
    highlights: [
      'Close encounters with the Rajah Brooke’s Birdwing butterfly',
      'Waterfall gardens with orchids, carnivorous pitcher plants, and ferns',
      'Live butterfly release sessions where you can release newly hatched butterflies',
      'Underground Luminescence glow-in-the-dark creature exhibition'
    ],
    mustTryEats: ['Tapir Cafe organic passionfruit cooler and dragonfruit bowls inside the sanctuary'],
    insiderTip: 'Wear bright yellow, orange, or floral clothing if you want butterflies to perch naturally on your shoulders for photos!',
    featured: false
  }
];

export const PENANG_STREET_FOOD_BIBLE = [
  {
    name: 'Penang Char Kway Teow',
    origin: 'Teochew Chinese',
    flavorProfile: 'Intense wok hei, savory, spicy, fragrant pork lard (or halal versions with duck egg)',
    keyIngredients: 'Flat rice noodles, fresh blood cockles, prawns, bean sprouts, chives, chili paste, duck egg',
    topLocations: ['Siam Road Charcoal CKT', 'Ah Leng CKT (Dato Kramat)', 'Left-handed CKT at Jalan Macalister']
  },
  {
    name: 'Penang Assam Laksa',
    origin: 'Peranakan / Nyonya',
    flavorProfile: 'Sour, spicy, savory, pungent with torch ginger and shrimp paste (hae ko)',
    keyIngredients: 'Mackerel fish flakes, tamarind (asam), lemongrass, mint leaves, sliced pineapple, thick rice noodles',
    topLocations: ['Air Itam Assam Laksa', 'Penang Road Famous Laksa', 'Kim Laksa (Balik Pulau)']
  },
  {
    name: 'Penang Road Teochew Chendol',
    origin: 'Teochew / Straits',
    flavorProfile: 'Sweet, creamy, refreshing with fragrant caramelized palm sugar',
    keyIngredients: 'Finely shaved ice, fresh coconut milk, green pandan rice flour jelly, simmered red beans, Gula Melaka',
    topLocations: ['Penang Road Famous Teochew Chendol (Lebuh Keng Kwee)', 'New Lane Chendol cart']
  },
  {
    name: 'Nasi Kandar',
    origin: 'Indian-Muslim (Mamak)',
    flavorProfile: 'Complex, intensely spiced, aromatic kuah campur (mixed curry flood)',
    keyIngredients: 'Steamed rice, honey fried chicken, mutton Mysore, beef rendang, curried squid, okra, salted egg',
    topLocations: ['Hameediyah Restaurant (since 1907)', 'Line Clear Nasi Kandar', 'Deen Maju (Jalan Gurdwara)']
  }
];

export const PENANG_WEATHER_INFO = {
  averageTemp: '28°C - 32°C (82°F - 90°F)',
  humidity: '75% - 85%',
  season: 'Tropical Maritime',
  currentConditions: {
    temp: '29°C',
    condition: 'Partly Sunny & Warm',
    seaBreeze: '12 km/h NE',
    humidityLevel: '78%',
    uvIndex: 'High (8/10)',
    rainChance: '25% in late afternoon'
  },
  travelAdvice: 'Wear lightweight cotton/linen clothing, carry SPF 50+ sunscreen, and keep a compact umbrella handy for sudden 20-minute tropical showers.'
};

export const PENANG_PACKING_LIST = [
  {
    category: 'Tropical Essentials',
    items: [
      'Breathable linen and dry-fit shirts',
      'Comfortable lightweight walking shorts / skirts',
      'Wide-brim hat or sun visor',
      'Polarized UV sunglasses',
      'High-SPF water-resistant sunscreen & lip balm'
    ]
  },
  {
    category: 'Temple & Cultural Etiquette',
    items: [
      'Light sarong or scarf to drape over bare shoulders',
      'Pants or long dresses covering knees for temples & mosques',
      'Slip-on shoes or sandals for easy removal before shrines'
    ]
  },
  {
    category: 'Footwear & Exploration',
    items: [
      'Broken-in cushioned walking sneakers for George Town street art',
      'Waterproof sandals / flip-flops for Batu Ferringhi beach',
      'Insect repellent spray (especially for Penang Hill & Entopia)'
    ]
  },
  {
    category: 'Tech, Cash & Logistics',
    items: [
      'UK 3-pin Type G plug adapter (standard in Malaysia)',
      '10,000+ mAh portable power bank for map navigation and photos',
      'Small Malaysian Ringgit cash notes (RM 1, 5, 10, 20) for hawkers',
      'Grab app downloaded for reliable rides throughout the island'
    ]
  }
];

export const PENANG_PHRASES = [
  { phrase: 'Terima Kasih', meaning: 'Thank you (Malay)', pronunciation: 'Teh-ree-mah Kah-see' },
  { phrase: 'Sama-sama', meaning: 'You are welcome (Malay)', pronunciation: 'Sah-mah sah-mah' },
  { phrase: 'Kam Sia', meaning: 'Thank you (Penang Hokkien)', pronunciation: 'Kahm Shee-ah' },
  { phrase: 'Tapau / Bungkus', meaning: 'Takeaway / To go (Local slang)', pronunciation: 'Tah-pow / Boong-koos' },
  { phrase: 'Sedap gila!', meaning: 'Insanely delicious! (Colloquial)', pronunciation: 'Seh-dahp gee-lah' },
  { phrase: 'Berapa ini?', meaning: 'How much is this? (Malay)', pronunciation: 'Beh-rah-pah ee-nee' },
  { phrase: 'Jio / Jom', meaning: 'Let’s go together! (Penang slang)', pronunciation: 'Jee-oh / Johm' }
];

export const DEFAULT_PENANG_ITINERARY: ItineraryPlan = {
  title: 'Penang Cultural & Foodie Odyssey (3 Days)',
  destination: 'Penang, Malaysia',
  summary: 'A curated immersion through George Town’s UNESCO street art lanes, Michelin-recognized hawker stalls, cloud-kissed Penang Hill rainforest, and sunset beaches.',
  estimatedBudget: 'RM 450 - RM 750 ($100 - $170 USD) per person',
  bestSeason: 'November to April for clear skies; vibrant year-round',
  days: [
    {
      dayNumber: 1,
      title: 'Heritage Alleys & Legendary Hawker Trails',
      theme: 'UNESCO Shophouses, Murals & Street Food Sizzle',
      description: 'Step into colonial times in George Town, uncover hidden interactive murals, and savor dishes perfected over decades.',
      stops: [
        {
          id: 'p-1',
          time: '08:30 AM',
          period: 'Morning',
          title: 'Toh Soon Cafe & Armenian Street Art Walk',
          category: 'Food & Heritage',
          description: 'Savor traditional charcoal-toasted bread with kaya butter, soft-boiled eggs, and robust iced Hainan coffee in Campbell alley before strolling through Armenian Street murals.',
          duration: '2 hours',
          locationName: 'Campbell Street & Armenian Street',
          transitInfo: 'Walking distance within heritage zone',
          insiderTip: 'Start early at 8:30 AM before tour crowds gather around the famous bicycle mural.',
          coordinates: { lat: 5.4151, lng: 100.3377 }
        },
        {
          id: 'p-2',
          time: '11:00 AM',
          period: 'Morning',
          title: 'Pinang Peranakan Mansion Tour',
          category: 'Heritage',
          description: 'Explore the lavish courtyard home of Kapitan Chung Keng Quee, showcasing thousands of Straits Chinese gold ornaments, bridal gowns, and antique carved wood.',
          duration: '1.5 hours',
          locationName: 'Church Street, George Town',
          transitInfo: '7 min walk from Armenian St',
          insiderTip: 'Join the free guided tour to hear tales of 19th-century secret societies and wedding rites.',
          coordinates: { lat: 5.4178, lng: 100.3409 }
        },
        {
          id: 'p-3',
          time: '01:00 PM',
          period: 'Midday',
          title: 'Penang Road Teochew Chendol & Assam Laksa',
          category: 'Food',
          description: 'Cool down with icy green pandan chendol drenched in fragrant Gula Melaka coconut milk, paired with sweet and sour mackerel asam laksa noodles.',
          duration: '1 hour',
          locationName: 'Lebuh Keng Kwee, George Town',
          transitInfo: '8 min walk or quick trishaw ride',
          insiderTip: 'Stand right by the roadside cart like a true local for the freshest bowl.',
          coordinates: { lat: 5.4171, lng: 100.3308 }
        },
        {
          id: 'p-4',
          time: '03:30 PM',
          period: 'Afternoon',
          title: 'Chew Jetty Clan Waterfront Village',
          category: 'Culture',
          description: 'Walk on timber planks over the sea along the largest waterfront clan settlement established by Chinese maritime dock laborers in the 1880s.',
          duration: '1.5 hours',
          locationName: 'Weld Quay, George Town',
          transitInfo: '10 min walk heading toward the seafront',
          insiderTip: 'Walk to the very end of the pier for breeze and views of ferries crossing the channel.',
          coordinates: { lat: 5.4127, lng: 100.3402 }
        },
        {
          id: 'p-5',
          time: '07:00 PM',
          period: 'Evening',
          title: 'Chulia Street Night Hawker Feast',
          category: 'Food',
          description: 'Tuck into smoky Char Kway Teow with duck egg, crispy wonton mee in dark soy gravy, and skewered chicken satay under lantern lights.',
          duration: '2.5 hours',
          locationName: 'Chulia Street, George Town',
          transitInfo: 'Short stroll within heritage core',
          insiderTip: 'Save room for freshly fried crispy banana fritters (pisang goreng) near the corner.',
          coordinates: { lat: 5.4184, lng: 100.3366 }
        }
      ]
    },
    {
      dayNumber: 2,
      title: 'Highland Rainforest & Sacred Temples',
      theme: 'Funicular Heights, Prehistoric Jungle & Sacred Pagodas',
      description: 'Ascend to the cool highlands of Penang Hill and marvel at Kek Lok Si, the grandest Buddhist sanctuary in Southeast Asia.',
      stops: [
        {
          id: 'p-6',
          time: '08:30 AM',
          period: 'Morning',
          title: 'Penang Hill Funicular & The Habitat Canopy Walk',
          category: 'Nature',
          description: 'Ascend 833m aboard the Swiss funicular. Walk through the 130-million-year-old rainforest on the 360-degree Curtis Crest Tree Top Walk.',
          duration: '3 hours',
          locationName: 'Penang Hill, Air Itam',
          transitInfo: '20 min Grab from George Town to Lower Station',
          insiderTip: 'Spot the gentle dusky leaf monkeys swinging through the canopy.',
          coordinates: { lat: 5.4243, lng: 100.2694 }
        },
        {
          id: 'p-7',
          time: '12:30 PM',
          period: 'Midday',
          title: 'Air Itam Sister Curry Mee & Local Fruit Market',
          category: 'Food',
          description: 'Relish charcoal-simmered curry noodles with cuttlefish and tofu puffs by the famous Lim sisters, followed by sweet tropical starfruit and mangoes.',
          duration: '1 hour',
          locationName: 'Air Itam Market Bridge',
          transitInfo: '10 min ride down from Penang Hill base',
          insiderTip: 'Add their homemade chili paste one spoon at a time — it has genuine kick!',
          coordinates: { lat: 5.4012, lng: 100.2783 }
        },
        {
          id: 'p-8',
          time: '02:00 PM',
          period: 'Afternoon',
          title: 'Kek Lok Si Temple of Supreme Bliss',
          category: 'Heritage & Spiritual',
          description: 'Explore the 7-storey Pagoda of Rama VI, the sacred tortoise pond, and ride the incline lift up to the towering 30-meter bronze Guanyin statue.',
          duration: '2.5 hours',
          locationName: 'Kek Lok Si, Air Itam',
          transitInfo: '5 min walk from Air Itam market',
          insiderTip: 'Tie a prayer ribbon on the wishing tree inside the grand courtyard for blessings.',
          coordinates: { lat: 5.3995, lng: 100.2736 }
        },
        {
          id: 'p-9',
          time: '06:30 PM',
          period: 'Evening',
          title: 'Gurney Drive Seafront Hawker Feast',
          category: 'Food',
          description: 'Dine alongside the coastal breeze at Gurney Drive. Order oyster omelets (Orh Jian), Pasembur salad, and fresh grilled stingray.',
          duration: '2.5 hours',
          locationName: 'Gurney Drive & Gurney Bay',
          transitInfo: '25 min Grab ride from Air Itam',
          insiderTip: 'Stroll the new illuminated Gurney Bay gardens after dinner to digest.',
          coordinates: { lat: 5.4398, lng: 100.3094 }
        }
      ]
    },
    {
      dayNumber: 3,
      title: 'Tropical Flora, Coastal Sunsets & Beach Vibes',
      theme: 'Biodiversity Wonders, Golden Sand Beaches & Night Bazaar',
      description: 'Journey to northern Penang for vibrant butterfly conservatories, lush tropical spice gardens, and relaxed beach life in Batu Ferringhi.',
      stops: [
        {
          id: 'p-10',
          time: '09:00 AM',
          period: 'Morning',
          title: 'Entopia Butterfly Sanctuary & Spice Garden',
          category: 'Nature',
          description: 'Wander inside a tropical glass biosphere with 15,000 free-flying butterflies, cascading waterfalls, and exotic flora.',
          duration: '2.5 hours',
          locationName: 'Teluk Bahang, Penang',
          transitInfo: '35 min scenic coastal Grab ride from George Town',
          insiderTip: 'Stand quietly in the sunny flowerbeds and butterflies will land on your hand.',
          coordinates: { lat: 5.465, lng: 100.2185 }
        },
        {
          id: 'p-11',
          time: '01:00 PM',
          period: 'Midday',
          title: 'Traditional Nyonya Lunch in Batu Ferringhi',
          category: 'Food',
          description: 'Dine on aromatic Curry Kapitan, Otak-Otak steamed in banana leaf packets, and crispy Inche Kabin chicken.',
          duration: '1.5 hours',
          locationName: 'Batu Ferringhi Coastal Strip',
          transitInfo: '10 min Grab ride from Teluk Bahang',
          insiderTip: 'Pair your lunch with refreshing iced nutmeg juice, a Penang specialty.',
          coordinates: { lat: 5.4746, lng: 100.2483 }
        },
        {
          id: 'p-12',
          time: '03:30 PM',
          period: 'Afternoon',
          title: 'Batu Ferringhi Beach & Watersports',
          category: 'Beach & Leisure',
          description: 'Lounge beneath swaying palms, soar over the bay on a tandem parasail, or relax on beach daybeds with fresh chilled young coconuts.',
          duration: '3 hours',
          locationName: 'Batu Ferringhi Main Beach',
          transitInfo: 'Direct beachfront access',
          insiderTip: 'Bring sunglasses and sunscreen; parasailing offers aerial views of the entire coastline.',
          coordinates: { lat: 5.4762, lng: 100.2497 }
        },
        {
          id: 'p-13',
          time: '06:45 PM',
          period: 'Night',
          title: 'Sunset Beach Dining & Night Market Souvenirs',
          category: 'Nightlife',
          description: 'Sip sunset mocktails with your toes in the sand at Bora Bora by the Sea, followed by browsing the vibrant 1km-long Batu Ferringhi night market.',
          duration: '2.5 hours',
          locationName: 'Bora Bora & Batu Ferringhi Night Bazaar',
          transitInfo: 'Beachfront and main coastal avenue',
          insiderTip: 'Haggle with a polite smile at the night market for batik shirts and hand-carved wood.',
          coordinates: { lat: 5.478, lng: 100.252 }
        }
      ]
    }
  ]
};
