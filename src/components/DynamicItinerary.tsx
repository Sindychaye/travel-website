import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Compass,
  Download,
  Share2,
  Sparkles,
  ChevronRight,
  Info,
  Car,
  DollarSign,
  Printer,
  Check,
  RotateCw,
  Sliders,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { ItineraryPlan, ItineraryStop } from '../types/travel';
import { InteractiveMapPlaceholder } from './InteractiveMapPlaceholder';

interface Props {
  itinerary: ItineraryPlan;
  isLoading?: boolean;
  onRegenerate: (prompt: string, days: number) => void;
  onAskAIAboutStop?: (stopName: string) => void;
  onSaveToLibrary?: () => void;
  onOpenSavedTrips?: () => void;
  lastSavedAt?: string | null;
}

export const DynamicItinerary: React.FC<Props> = ({
  itinerary,
  isLoading = false,
  onRegenerate,
  onAskAIAboutStop,
  onSaveToLibrary,
  onOpenSavedTrips,
  lastSavedAt,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [customDays, setCustomDays] = useState<number>(itinerary.days.length || 3);
  const [customPrompt, setCustomPrompt] = useState<string>('Plan a food and heritage trip to Penang');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const currentDay = itinerary.days[selectedDayIndex] || itinerary.days[0];

  const handleSaveTrip = () => {
    if (onSaveToLibrary) {
      onSaveToLibrary();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleShare = () => {
    const text = `Check out my ${itinerary.title} for ${itinerary.destination}!\n${itinerary.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegenerate(customPrompt, customDays);
    setShowConfig(false);
  };

  return (
    <section id="itinerary" className="py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>AI-Generated Dynamic Travel Plan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-stone-900 tracking-tight">
              {itinerary.title}
            </h2>
            <p className="mt-2 text-stone-600 max-w-2xl text-sm sm:text-base leading-relaxed">
              {itinerary.summary}
            </p>

            {/* Metadata strip */}
            <div className="mt-4 flex items-center flex-wrap gap-4 text-xs text-stone-500">
              {itinerary.estimatedBudget && (
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium text-stone-700">Estimated Budget:</span>
                  <span>{itinerary.estimatedBudget}</span>
                </div>
              )}
              {itinerary.bestSeason && (
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-medium text-stone-700">Best Season:</span>
                  <span>{itinerary.bestSeason}</span>
                </div>
              )}
              {/* Local Storage Auto-sync Indicator */}
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Auto-saved to browser</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Bookmark to Library Button */}
            {onSaveToLibrary && (
              <button
                onClick={handleSaveTrip}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                title="Save this itinerary to your trips library"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Saved to Trips!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-white" />
                    <span>Save to My Trips</span>
                  </>
                )}
              </button>
            )}

            {/* View Saved Trips Button */}
            {onOpenSavedTrips && (
              <button
                onClick={onOpenSavedTrips}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-stone-600" />
                <span>My Saved Trips</span>
              </button>
            )}

            <button
              onClick={() => setShowConfig(!showConfig)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-stone-600" />
              <span>Customize Days</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-600" />
                  <span>Share Plan</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Customization Drawer / Popover */}
        {showConfig && (
          <div className="mb-10 p-6 bg-white rounded-3xl border border-stone-200 shadow-lg animate-fadeIn text-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Customize Itinerary Generation
              </h4>
              <button
                onClick={() => setShowConfig(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  What would you like to experience?
                </label>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. More street hawker food, less walking, sunset drinks at Batu Ferringhi"
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Duration</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setCustomDays(d)}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                          customDays === d
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Custom Plan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Day Selector Tabs (Clean segmented control conforming to design discipline) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {itinerary.days.map((day, idx) => (
            <button
              key={day.dayNumber}
              onClick={() => {
                setSelectedDayIndex(idx);
                setActiveStopId(null);
              }}
              className={`px-5 py-3 rounded-2xl text-left transition-all cursor-pointer whitespace-nowrap border ${
                selectedDayIndex === idx
                  ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/10'
                  : 'bg-stone-100 hover:bg-stone-200/70 border-stone-200 text-stone-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold ${
                    selectedDayIndex === idx ? 'text-amber-700' : 'text-stone-500'
                  }`}
                >
                  Day {day.dayNumber}
                </span>
                <span className="text-[11px] text-stone-400">· {day.stops.length} stops</span>
              </div>
              <p
                className={`text-xs font-medium mt-0.5 max-w-[200px] truncate ${
                  selectedDayIndex === idx ? 'text-stone-900' : 'text-stone-600'
                }`}
              >
                {day.title}
              </p>
            </button>
          ))}
        </div>

        {/* Day Summary Kicker Banner */}
        {currentDay && (
          <div className="mb-8 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Day {currentDay.dayNumber} Focus: {currentDay.theme}
              </div>
              <p className="text-xs text-stone-600 mt-0.5">{currentDay.description}</p>
            </div>
            <div className="text-[11px] text-stone-500 shrink-0 font-medium">
              🗺️ Plotted on Island Route Map
            </div>
          </div>
        )}

        {/* Core Layout: Left Timeline, Right Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Timeline List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {currentDay?.stops?.map((stop, idx) => {
              const isActive = activeStopId === stop.id;
              const isLast = idx === currentDay.stops.length - 1;

              return (
                <div
                  key={stop.id}
                  id={`stop-${stop.id}`}
                  onClick={() => setActiveStopId(stop.id)}
                  className={`relative pl-8 pb-6 transition-all group ${
                    isLast ? 'pb-0' : ''
                  }`}
                >
                  {/* Vertical Timeline Guide Line */}
                  {!isLast && (
                    <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-stone-200 group-hover:bg-amber-300 transition-colors" />
                  )}

                  {/* Timeline Stop Badge */}
                  <div
                    className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shadow-sm ${
                      isActive
                        ? 'bg-amber-600 border-white text-white scale-110 ring-4 ring-amber-500/20'
                        : 'bg-white border-stone-300 text-stone-700 group-hover:border-amber-500 group-hover:text-amber-700'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Timeline Card */}
                  <div
                    className={`p-5 rounded-2xl bg-white border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-amber-500 shadow-md ring-2 ring-amber-500/10'
                        : 'border-stone-200 hover:border-stone-300 shadow-sm hover:shadow'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                          {stop.time}
                        </span>
                        <span className="text-xs text-stone-400 font-medium">({stop.period})</span>
                        <span className="text-[11px] text-stone-500">· {stop.duration}</span>
                      </div>

                      <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                        {stop.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {stop.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                      {stop.description}
                    </p>

                    {/* Transit & Location Row */}
                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate max-w-xs">{stop.locationName}</span>
                      </div>

                      {stop.transitInfo && (
                        <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                          <Car className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>{stop.transitInfo}</span>
                        </div>
                      )}
                    </div>

                    {/* Insider Tip (if available) */}
                    {stop.insiderTip && (
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-stone-800 text-[11px] flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-amber-900">Concierge Tip: </span>
                          <span className="text-stone-700">{stop.insiderTip}</span>
                        </div>
                      </div>
                    )}

                    {/* Quick Action footer */}
                    <div className="mt-3 flex items-center justify-end gap-2 pt-2">
                      {onAskAIAboutStop && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAskAIAboutStop(stop.title);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-amber-800 hover:bg-amber-100 transition-colors flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Ask AI</span>
                        </button>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${stop.locationName}, Penang, Malaysia`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-stone-600 hover:bg-stone-100 transition-colors flex items-center gap-1"
                      >
                        <span>Directions</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Map Placeholder (5 cols, sticky) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <InteractiveMapPlaceholder
              stops={currentDay?.stops || []}
              activeStopId={activeStopId}
              onSelectStop={(id) => {
                setActiveStopId(id);
                // Smooth scroll to timeline card
                const el = document.getElementById(`stop-${id}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              dayTitle={`Day ${currentDay?.dayNumber}: ${currentDay?.theme}`}
            />

            {/* Quick Island Transit Notes */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
              <h5 className="font-bold text-stone-900 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-600" />
                Penang Island Travel Logistics
              </h5>
              <p className="text-[11px] leading-relaxed">
                • <strong>Grab Rides:</strong> Available 24/7 across Penang. Typical fares: George Town to Air Itam ~RM 12–15; George Town to Batu Ferringhi ~RM 20–28.
              </p>
              <p className="text-[11px] leading-relaxed">
                • <strong>Rapid Penang Bus:</strong> Bus 101 connects George Town to Batu Ferringhi & National Park; Bus 204 goes to Penang Hill & Kek Lok Si.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
