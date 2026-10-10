import React, { useState } from 'react';
import { Compass, MapPin, Navigation, ExternalLink, Layers, Sparkles, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ItineraryStop } from '../types/travel';

interface Props {
  stops: ItineraryStop[];
  activeStopId?: string | null;
  onSelectStop?: (stopId: string) => void;
  dayTitle?: string;
}

export const InteractiveMapPlaceholder: React.FC<Props> = ({
  stops,
  activeStopId,
  onSelectStop,
  dayTitle = 'Day Stops',
}) => {
  const [selectedPin, setSelectedPin] = useState<string | null>(activeStopId || null);
  const [mapStyle, setMapStyle] = useState<'terrain' | 'minimal' | 'night'>('terrain');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Penang geographic bounds roughly lat: 5.28 to 5.48, lng: 100.18 to 100.36
  // Convert lat/lng to approximate SVG coordinates (500 x 400 SVG box)
  const getMapPosition = (lat: number, lng: number) => {
    const minLat = 5.32;
    const maxLat = 5.485;
    const minLng = 100.19;
    const maxLng = 100.36;

    const xPercent = Math.max(8, Math.min(92, ((lng - minLng) / (maxLng - minLng)) * 100));
    // lat is inverted because higher lat is further north (lower y in SVG)
    const yPercent = Math.max(10, Math.min(90, (1 - (lat - minLat) / (maxLat - minLat)) * 100));

    return { x: xPercent, y: yPercent };
  };

  const currentActive = stops.find((s) => s.id === (selectedPin || activeStopId)) || stops[0];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-xl flex flex-col text-stone-100">
      {/* Top Map Header & Controls */}
      <div className="px-4 py-3 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 flex items-center justify-between z-10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-stone-200 tracking-wide uppercase">
              Penang Island Interactive Navigator
            </h4>
            <p className="text-[11px] text-stone-400">
              {stops.length} stops plotted · {dayTitle}
            </p>
          </div>
        </div>

        {/* Map Style Controls */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center bg-stone-800/80 rounded-lg p-0.5 border border-stone-700/60">
            <button
              onClick={() => setMapStyle('terrain')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                mapStyle === 'terrain'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Topographic
            </button>
            <button
              onClick={() => setMapStyle('minimal')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                mapStyle === 'minimal'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Light Route
            </button>
            <button
              onClick={() => setMapStyle('night')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                mapStyle === 'night'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Night Glow
            </button>
          </div>

          <div className="flex items-center gap-1 bg-stone-800/80 rounded-lg p-0.5 border border-stone-700/60">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1 text-stone-400 hover:text-stone-200"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1 text-stone-400 hover:text-stone-200"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-stone-400 hover:text-stone-200"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map Area */}
      <div className="relative w-full h-[360px] md:h-[420px] overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b1120] select-none">
        {/* Animated Background Grid & Sea Waves */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Scaled Island Graphics */}
        <div
          className="relative w-full h-full transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Penang Island Simplified Silhouette SVG */}
          <svg
            viewBox="0 0 1000 750"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            <defs>
              <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyle === 'minimal' ? '#334155' : mapStyle === 'night' ? '#1e293b' : '#14342b'} />
                <stop offset="60%" stopColor={mapStyle === 'minimal' ? '#1e293b' : mapStyle === 'night' ? '#0f172a' : '#164e3f'} />
                <stop offset="100%" stopColor={mapStyle === 'minimal' ? '#0f172a' : mapStyle === 'night' ? '#020617' : '#062e24'} />
              </linearGradient>

              <pattern id="contourPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0,20 Q 10,10 20,20 T 40,20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Sea contour rings */}
            <path
              d="M 280,120 C 440,90 620,110 740,190 C 820,260 840,410 790,520 C 740,630 580,680 430,650 C 310,620 220,530 190,410 C 170,300 210,170 280,120 Z"
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.25"
            />

            {/* Main Penang Island Landmass Shape */}
            <path
              d="M 310,140 C 440,110 590,125 700,200 C 780,260 810,380 770,490 C 730,590 610,640 460,620 C 340,600 250,510 220,410 C 195,310 230,190 310,140 Z"
              fill="url(#islandGrad)"
              stroke="#059669"
              strokeWidth="2.5"
            />
            {/* Mountain Ridge (Penang Hill elevation) */}
            <ellipse cx="490" cy="360" rx="130" ry="100" fill="#047857" opacity="0.4" />
            <ellipse cx="480" cy="350" rx="80" ry="60" fill="#10b981" opacity="0.3" />

            {/* Mainland Malaysia coastline edge (Seberang Perai) */}
            <path
              d="M 880,50 L 920,200 L 910,400 L 940,600 L 920,720"
              fill="none"
              stroke="#334155"
              strokeWidth="4"
              strokeDasharray="8 6"
              opacity="0.5"
            />
            {/* Penang Bridge 1 & 2 indicators */}
            <line x1="710" y1="450" x2="905" y2="440" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="610" y1="590" x2="925" y2="620" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />

            {/* Geographic labels */}
            <text x="735" y="245" fill="#f8fafc" fontSize="16" fontWeight="bold" opacity="0.9">George Town</text>
            <text x="735" y="262" fill="#94a3b8" fontSize="11" opacity="0.8">UNESCO Heritage Core</text>
            <text x="330" y="165" fill="#e2e8f0" fontSize="14" fontWeight="600" opacity="0.85">Batu Ferringhi</text>
            <text x="460" y="365" fill="#a7f3d0" fontSize="13" fontWeight="600" opacity="0.9">Penang Hill (833m)</text>
            <text x="540" y="420" fill="#fed7aa" fontSize="13" opacity="0.85">Air Itam (Kek Lok Si)</text>
            <text x="880" y="380" fill="#64748b" fontSize="11" opacity="0.7">Penang Strait</text>

            {/* Connecting Itinerary Flight/Transit Path between plotted stops */}
            {stops.length > 1 && (
              <polyline
                points={stops
                  .map((stop) => {
                    const pos = getMapPosition(stop.coordinates.lat, stop.coordinates.lng);
                    return `${(pos.x / 100) * 1000},${(pos.y / 100) * 750}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="3.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                opacity="0.85"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* Interactive Stop Pins Overlay */}
          {stops.map((stop, idx) => {
            const pos = getMapPosition(stop.coordinates.lat, stop.coordinates.lng);
            const isSelected = (selectedPin || activeStopId) === stop.id;

            return (
              <div
                key={stop.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                onClick={() => {
                  setSelectedPin(stop.id);
                  if (onSelectStop) onSelectStop(stop.id);
                }}
              >
                {/* Pin Aura */}
                {isSelected && (
                  <span className="absolute -inset-3 rounded-full bg-amber-400/30 animate-ping" />
                )}

                {/* Pin Icon badge */}
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all transform group-hover:scale-110 shadow-lg ${
                    isSelected
                      ? 'bg-amber-500 border-white text-stone-950 font-bold scale-110 ring-4 ring-amber-500/30'
                      : 'bg-stone-900 border-amber-400 text-amber-300 hover:bg-stone-800'
                  }`}
                >
                  <span className="text-xs font-bold">{idx + 1}</span>
                </div>

                {/* Floating tooltip on hover */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none whitespace-nowrap transition-all duration-200 z-30 ${
                    isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`}
                >
                  <div className="bg-stone-950/95 backdrop-blur-md text-white text-[11px] px-2.5 py-1.5 rounded-lg border border-stone-700 shadow-xl flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="font-semibold">{stop.time}</span>
                    <span className="text-stone-300">· {stop.locationName}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Overlay at Bottom-Left */}
        <div className="absolute bottom-3 left-3 bg-stone-950/85 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-800/80 text-[11px] space-y-1 z-10 hidden sm:block">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Itinerary Stops ({stops.length} today)</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-4 h-0.5 bg-amber-400 border border-dashed border-amber-300" />
            <span>Recommended Route Sequence</span>
          </div>
        </div>

        {/* Compass Rose at Top-Right */}
        <div className="absolute top-3 right-3 bg-stone-950/60 backdrop-blur-sm p-2 rounded-xl border border-stone-800 text-stone-400 flex flex-col items-center text-[10px] z-10 pointer-events-none">
          <span className="text-amber-400 font-bold">N</span>
          <div className="w-0.5 h-4 bg-stone-600 my-0.5 relative">
            <div className="w-0.5 h-2 bg-amber-400 absolute top-0" />
          </div>
          <span>S</span>
        </div>
      </div>

      {/* Selected Stop Quick Info Bar */}
      {currentActive && (
        <div className="p-3.5 bg-stone-900 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-amber-400">
                  {currentActive.time} ({currentActive.period})
                </span>
                <span className="text-[11px] text-stone-400">· {currentActive.duration}</span>
                <span className="text-[11px] text-stone-300 bg-stone-800 px-2 py-0.5 rounded-full">
                  {currentActive.category}
                </span>
              </div>
              <h5 className="text-sm font-semibold text-white truncate">{currentActive.title}</h5>
              <p className="text-xs text-stone-400 truncate max-w-md">
                📍 {currentActive.locationName}
                {currentActive.transitInfo ? ` · ${currentActive.transitInfo}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${currentActive.locationName}, Penang, Malaysia`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-stone-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
