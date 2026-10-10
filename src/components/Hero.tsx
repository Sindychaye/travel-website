import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Calendar, Users, Compass, ArrowRight, Utensils, Landmark, Palmtree, Flame } from 'lucide-react';
import { TravelStyle, TravelParty } from '../types/travel';

interface Props {
  onSearch: (prompt: string, days: number, style: TravelStyle, party: TravelParty) => void;
  isLoading?: boolean;
}

export const Hero: React.FC<Props> = ({ onSearch, isLoading = false }) => {
  const [prompt, setPrompt] = useState('Plan a 3-day food trip to Penang');
  const [days, setDays] = useState<number>(3);
  const [style, setStyle] = useState<TravelStyle>('Foodie & Street Hawkers');
  const [party, setParty] = useState<TravelParty>('Couple / Romantic');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const samplePrompts = [
    { label: '3-Day Food Trail & Hawker Feast', prompt: 'Plan a 3-day food trip to Penang with Char Kway Teow, Assam Laksa, and Chendol' },
    { label: 'Heritage Murals & Clan Jetties', prompt: 'Plan a 2-day historical walk covering George Town street art, Peranakan Mansion, and Chew Jetty' },
    { label: 'Penang Hill & Sacred Temples', prompt: 'Create a nature and culture itinerary covering Penang Hill funicular, The Habitat canopy, and Kek Lok Si' },
    { label: 'Beach Relaxation & Sunset Cocktails', prompt: 'Plan a relaxed 3-day coastal getaway in Batu Ferringhi with water sports and night bazaar' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSearch(prompt.trim(), days, style, party);
  };

  const handlePromptSelect = (p: string) => {
    setPrompt(p);
    onSearch(p, days, style, party);
  };

  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-stone-950 text-white">
      {/* Background Photography with Sophisticated Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=2000&q=85"
          alt="Penang George Town Heritage"
          className="w-full h-full object-cover object-center filter brightness-[0.42] scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Curated Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-6 shadow-lg animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Next-Generation AI Travel Concierge</span>
          <span className="text-white/40">·</span>
          <span className="text-stone-200">Penang, Malaysia</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-serif leading-[1.1] max-w-4xl drop-shadow-md">
          Discover the Soul of Penang,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 italic">
            Curated in Seconds.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl font-light leading-relaxed">
          From Michelin-recognized street food woks to UNESCO shophouses and misty rainforest canopies. Tell our AI your travel dreams and get your custom, interactive itinerary.
        </p>

        {/* Natural Language Search Box (Hero Centerpiece) */}
        <div className="mt-10 w-full max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-stone-900/90 backdrop-blur-xl border border-stone-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2 transition-all focus-within:border-amber-500/80 focus-within:ring-4 focus-within:ring-amber-500/20"
          >
            <div className="flex items-center gap-3 w-full px-3 py-2 flex-1">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Plan a 3-day food trip to Penang with street art and beach sunsets..."
                className="w-full bg-transparent text-white placeholder-stone-400 text-sm sm:text-base focus:outline-none font-normal"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="px-3 py-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 text-xs font-medium transition-colors border border-stone-700/60"
              >
                {days} Days · {style.split(' ')[0]}
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>Planning...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Collapsible Advanced Preferences Bar */}
          {showAdvanced && (
            <div className="mt-3 p-4 rounded-2xl bg-stone-900/95 backdrop-blur-md border border-stone-800 text-left grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn text-xs">
              <div>
                <label className="text-stone-400 block mb-1 font-medium">Trip Duration</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                        days === d
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {d}D
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-stone-400 block mb-1 font-medium">Travel Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as TravelStyle)}
                  className="w-full bg-stone-800 border border-stone-700 text-stone-200 rounded-lg p-2 focus:outline-none focus:border-amber-500"
                >
                  <option value="Foodie & Street Hawkers">Foodie & Hawkers</option>
                  <option value="Balanced & Cultural">Balanced & Cultural</option>
                  <option value="Scenic & Relaxed">Scenic & Relaxed</option>
                  <option value="Adventure & Nature">Adventure & Nature</option>
                  <option value="Luxury & Boutique">Luxury & Boutique</option>
                </select>
              </div>

              <div>
                <label className="text-stone-400 block mb-1 font-medium">Travel Party</label>
                <select
                  value={party}
                  onChange={(e) => setParty(e.target.value as TravelParty)}
                  className="w-full bg-stone-800 border border-stone-700 text-stone-200 rounded-lg p-2 focus:outline-none focus:border-amber-500"
                >
                  <option value="Couple / Romantic">Couple / Romantic</option>
                  <option value="Solo Traveler">Solo Traveler</option>
                  <option value="Family with Kids">Family with Kids</option>
                  <option value="Friends Getaway">Friends Getaway</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Suggestions Chips */}
          <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-xs">
            <span className="text-stone-400 font-medium">Try asking:</span>
            {samplePrompts.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePromptSelect(item.prompt)}
                className="px-3 py-1.5 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700/60 transition-all hover:border-amber-400/50 cursor-pointer text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Distinction Stats Bar */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-stone-300 text-left">
          <div className="p-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4" />
              <span>UNESCO Site</span>
            </div>
            <p className="text-lg font-bold text-white">George Town</p>
            <p className="text-xs text-stone-400">Living colonial heritage since 2008</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Utensils className="w-4 h-4" />
              <span>Gastronomy</span>
            </div>
            <p className="text-lg font-bold text-white">200+ Hawkers</p>
            <p className="text-xs text-stone-400">Voted world's best street food</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Palmtree className="w-4 h-4" />
              <span>Climate</span>
            </div>
            <p className="text-lg font-bold text-white">28°C - 32°C</p>
            <p className="text-xs text-stone-400">Year-round tropical breeze</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>AI Engine</span>
            </div>
            <p className="text-lg font-bold text-white">Gemini 3.8 Flash</p>
            <p className="text-xs text-stone-400">Instant day-by-day routing</p>
          </div>
        </div>
      </div>
    </section>
  );
};
