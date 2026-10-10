import React, { useState } from 'react';
import { Star, MapPin, Clock, ArrowUpRight, Search, Sparkles, Filter, Compass } from 'lucide-react';
import { Destination } from '../types/travel';
import { PENANG_DESTINATIONS } from '../data/penangData';

interface Props {
  onSelectDestination: (destination: Destination) => void;
  onAskAIAboutDestination: (name: string) => void;
}

export const DestinationGallery: React.FC<Props> = ({
  onSelectDestination,
  onAskAIAboutDestination,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'heritage', label: 'UNESCO Heritage & Art' },
    { id: 'food', label: 'Street Food & Hawkers' },
    { id: 'nature', label: 'Highlands & Rainforest' },
    { id: 'beach', label: 'Beaches & Coastal' },
    { id: 'culture', label: 'Temples & Stilt Villages' },
  ];

  const filteredDestinations = PENANG_DESTINATIONS.filter((dest) => {
    const matchesCategory =
      activeCategory === 'all' || dest.category === activeCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="destinations" className="py-24 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Curated Destination Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-stone-900 tracking-tight">
              Iconic Penang Landmarks
            </h2>
            <p className="mt-2 text-stone-600 max-w-2xl text-sm sm:text-base">
              From George Town’s UNESCO mural alleys to Kek Lok Si’s sacred pagodas and the coastal shores of Batu Ferringhi. Explore the best of the island.
            </p>
          </div>

          {/* Search bar inside gallery */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search landmarks or food..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Tabs (Segmented Control conforming to anti-slop guidelines) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Card Photo Container */}
              <div className="relative h-52 w-full overflow-hidden bg-stone-200">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80" />

                {/* Top overlay metadata */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-medium border border-white/10">
                    {dest.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-white/10 text-amber-300">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                  </div>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1">{dest.subtitle}</p>
                </div>
              </div>

              {/* Card Description & Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                {/* Metadata strip without pills */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1 truncate max-w-[150px]">
                    <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                    {dest.suggestedDuration}
                  </span>
                  <span className="font-medium text-stone-700">{dest.admissionFee}</span>
                </div>

                {/* Card Action footer */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAIAboutDestination(dest.name);
                    }}
                    className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-medium flex items-center gap-1 transition-colors"
                    title="Ask AI Concierge about this destination"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Ask AI</span>
                  </button>

                  <span className="text-xs font-semibold text-stone-900 group-hover:text-amber-700 flex items-center gap-1 transition-colors">
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 mt-6 p-8">
            <Compass className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-stone-800">No destinations match your search</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try searching for "temple", "laksa", "George Town", or select "All Destinations".
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
