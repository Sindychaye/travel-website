import React from 'react';
import { X, Star, MapPin, Clock, DollarSign, Lightbulb, Utensils, Compass, ExternalLink, Sparkles } from 'lucide-react';
import { Destination } from '../types/travel';

interface Props {
  destination: Destination | null;
  onClose: () => void;
  onAskAIAboutPlace?: (name: string) => void;
  onAddToItinerary?: (destination: Destination) => void;
}

export const DestinationDetailModal: React.FC<Props> = ({
  destination,
  onClose,
  onAskAIAboutPlace,
  onAddToItinerary,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900/80 text-white backdrop-blur-md transition-transform hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Banner with Image */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-stone-900">
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-amber-300">
                <span className="uppercase tracking-wider">{destination.categoryLabel}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-white">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {destination.rating} ({destination.reviewCount} reviews)
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif leading-tight">
                {destination.name}
              </h3>
              <p className="text-sm text-stone-300 mt-1">{destination.subtitle}</p>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
              <div>
                <span className="text-stone-400 block mb-0.5">Admission</span>
                <span className="font-semibold text-stone-800">{destination.admissionFee}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Duration</span>
                <span className="font-semibold text-stone-800">{destination.suggestedDuration}</span>
              </div>
              <div className="col-span-2">
                <span className="text-stone-400 block mb-0.5">Best Time to Visit</span>
                <span className="font-semibold text-stone-800">{destination.bestTimeToVisit}</span>
              </div>
            </div>

            {/* Overview Narrative */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                About this landmark
              </h4>
              <p className="text-stone-700 leading-relaxed text-sm md:text-base">
                {destination.extendedDescription || destination.description}
              </p>
            </div>

            {/* Key Highlights */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                Key Highlights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {destination.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-stone-700 p-2.5 rounded-xl bg-stone-50 border border-stone-100"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Must-try Eats Nearby (if available) */}
            {destination.mustTryEats && destination.mustTryEats.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2.5 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  Must-Try Local Eats Nearby
                </h4>
                <div className="flex flex-wrap gap-2">
                  {destination.mustTryEats.map((eat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium"
                    >
                      <span>🍜</span> {eat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Insider Tip Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-stone-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-800">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Concierge Insider Tip</span>
              </div>
              <p className="text-stone-700 leading-relaxed">{destination.insiderTip}</p>
            </div>

            {/* Address */}
            <div className="text-xs text-stone-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{destination.address}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${destination.name}, Penang, Malaysia`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            {onAskAIAboutPlace && (
              <button
                onClick={() => {
                  onAskAIAboutPlace(destination.name);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About This Place</span>
              </button>
            )}
            {onAddToItinerary && (
              <button
                onClick={() => {
                  onAddToItinerary(destination);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-all"
              >
                Add to Itinerary
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
