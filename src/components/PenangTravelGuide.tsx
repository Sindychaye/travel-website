import React, { useState } from 'react';
import {
  Utensils,
  Sun,
  Package,
  BookOpen,
  MessageCircle,
  Car,
  Compass,
  CheckCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import {
  PENANG_STREET_FOOD_BIBLE,
  PENANG_WEATHER_INFO,
  PENANG_PACKING_LIST,
  PENANG_PHRASES,
} from '../data/penangData';

interface Props {
  onAskAI: (topic: string) => void;
}

export const PenangTravelGuide: React.FC<Props> = ({ onAskAI }) => {
  const [activeTab, setActiveTab] = useState<'food' | 'weather' | 'packing' | 'phrases' | 'transit'>('food');

  return (
    <section id="guide" className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Insider Island Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-stone-900 tracking-tight">
              The Essential Penang Field Guide
            </h2>
            <p className="mt-2 text-stone-600 max-w-2xl text-sm sm:text-base">
              Everything you need to navigate Penang like a seasoned resident — from Michelin street food secrets to tropical packing and local etiquette.
            </p>
          </div>
        </div>

        {/* Segmented Control Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setActiveTab('food')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'food'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-amber-500" />
            <span>Street Food Bible</span>
          </button>

          <button
            onClick={() => setActiveTab('weather')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'weather'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Climate & Weather</span>
          </button>

          <button
            onClick={() => setActiveTab('packing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'packing'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-amber-500" />
            <span>Packing Checklist</span>
          </button>

          <button
            onClick={() => setActiveTab('phrases')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'phrases'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Local Slang & Phrases</span>
          </button>

          <button
            onClick={() => setActiveTab('transit')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'transit'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-amber-500" />
            <span>Island Transit</span>
          </button>
        </div>

        {/* Tab 1: Street Food Bible */}
        {activeTab === 'food' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {PENANG_STREET_FOOD_BIBLE.map((dish, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-all shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                      {dish.origin} Heritage
                    </span>
                    <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
                      {dish.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => onAskAI(`Tell me how to order the best ${dish.name} in Penang`)}
                    className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-700 border border-stone-200 text-xs font-medium flex items-center gap-1 transition-colors"
                    title="Ask AI about this dish"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Ask AI</span>
                  </button>
                </div>

                <div className="text-xs text-stone-600 space-y-1.5">
                  <p>
                    <strong className="text-stone-900">Flavor Profile: </strong>
                    {dish.flavorProfile}
                  </p>
                  <p>
                    <strong className="text-stone-900">Key Ingredients: </strong>
                    {dish.keyIngredients}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block mb-2">
                    Legendary Hawker Stalls
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dish.topLocations.map((loc, lIdx) => (
                      <span
                        key={lIdx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 text-xs font-medium"
                      >
                        📍 {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Climate & Weather */}
        {activeTab === 'weather' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            {/* Main Climate Card */}
            <div className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-stone-50 to-white border border-amber-500/20 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Live Tropical Forecast
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-stone-900 mt-1">
                    George Town & Penang Island
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg">
                  <Sun className="w-8 h-8" />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 block mb-0.5">Current Temp</span>
                  <span className="text-xl font-bold text-stone-900">
                    {PENANG_WEATHER_INFO.currentConditions.temp}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Condition</span>
                  <span className="font-semibold text-stone-800">
                    {PENANG_WEATHER_INFO.currentConditions.condition}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Humidity</span>
                  <span className="font-semibold text-stone-800">
                    {PENANG_WEATHER_INFO.currentConditions.humidityLevel}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Rain Probability</span>
                  <span className="font-semibold text-amber-700">
                    {PENANG_WEATHER_INFO.currentConditions.rainChance}
                  </span>
                </div>
              </div>

              <div className="text-xs text-stone-700 space-y-2">
                <h4 className="font-bold text-stone-900">Concierge Climate Advice:</h4>
                <p className="leading-relaxed">{PENANG_WEATHER_INFO.travelAdvice}</p>
              </div>

              <button
                onClick={() => onAskAI('What is the current hourly weather forecast for Penang today?')}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI for Hourly Weather Breakdown</span>
              </button>
            </div>

            {/* Exploration Timing Tips Card */}
            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                Optimal Exploration Hours
              </h4>

              <div className="space-y-3 text-xs text-stone-600">
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <strong className="text-stone-900 block mb-1">🌅 07:30 AM - 10:30 AM</strong>
                  Cool morning mist. Perfect for Armenian Street murals, Kek Lok Si hillside steps, and breakfast at Toh Soon.
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <strong className="text-stone-900 block mb-1">🏛️ 11:30 AM - 03:30 PM</strong>
                  Peak tropical sun. Ideal for air-conditioned Pinang Peranakan Mansion, indoor cafes, and Entopia.
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <strong className="text-stone-900 block mb-1">🌇 05:00 PM - 09:30 PM</strong>
                  Golden sunset hours & sea breezes. Perfect for Batu Ferringhi beach and lively night hawkers.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Packing Checklist */}
        {activeTab === 'packing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {PENANG_PACKING_LIST.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                  <Package className="w-4 h-4 text-amber-600" />
                  <h4>{cat.category}</h4>
                </div>

                <ul className="space-y-2 text-xs text-stone-600">
                  {cat.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Local Slang & Phrases */}
        {activeTab === 'phrases' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
            {PENANG_PHRASES.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-all space-y-1.5"
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="text-lg font-bold font-serif text-stone-900">{p.phrase}</h4>
                  <span className="text-[11px] text-amber-700 font-medium">/{p.pronunciation}/</span>
                </div>
                <p className="text-xs text-stone-600">{p.meaning}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Island Transit */}
        {activeTab === 'transit' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Recommended
              </span>
              <h4 className="text-lg font-bold font-serif text-stone-900">Grab E-Hailing</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                The most seamless way to travel across Penang. Rides arrive within 3–5 minutes throughout George Town, Batu Ferringhi, and Air Itam.
              </p>
              <div className="text-xs text-stone-500 pt-2 border-t border-stone-200">
                <strong>Average Fares:</strong> George Town ~RM 6–10; Airport ~RM 25–35.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Historic Charm
              </span>
              <h4 className="text-lg font-bold font-serif text-stone-900">Heritage Trishaw</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Take a relaxed open-air trishaw ride through the narrow lanes of George Town for mural photo stops and storytelling from elder drivers.
              </p>
              <div className="text-xs text-stone-500 pt-2 border-t border-stone-200">
                <strong>Negotiate First:</strong> Standard rate is ~RM 50/hour.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Public Bus
              </span>
              <h4 className="text-lg font-bold font-serif text-stone-900">Rapid Penang</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Air-conditioned public buses connecting Weld Quay terminal to Penang Hill (Bus 204) and Batu Ferringhi / Teluk Bahang (Bus 101).
              </p>
              <div className="text-xs text-stone-500 pt-2 border-t border-stone-200">
                <strong>Payment:</strong> Exact cash coins or Touch 'n Go card.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
