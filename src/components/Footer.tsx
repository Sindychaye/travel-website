import React from 'react';
import { Compass, Sparkles, MapPin, Heart, ExternalLink, Github } from 'lucide-react';

interface Props {
  onNavigateSection: (sectionId: string) => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigateSection, onOpenChat }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-white tracking-wide">
                WanderAI
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Your next-generation AI travel companion for Penang, Malaysia and worldwide journeys. Real-time customized itineraries, local hawker intelligence, and interactive route mapping.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] text-amber-400">
                <Sparkles className="w-3 h-3" />
                Gemini 3.8 Flash Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] text-emerald-400">
                ✓ Ready for Vercel & GitHub
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Travel Navigation
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateSection('hero')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  AI Discovery Hero
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('destinations')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Featured Penang Landmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('itinerary')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Dynamic Timeline Itinerary
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('guide')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Street Food Bible & Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenChat}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 text-amber-300"
                >
                  <Sparkles className="w-3 h-3" />
                  Ask AI Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Responsible travel note */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Penang UNESCO Heritage
            </h4>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              George Town was declared a UNESCO World Heritage Site on July 7, 2008. Please respect residential stilt homes at Clan Jetties and adhere to modest dress codes inside temples and mosques.
            </p>
            <div className="pt-2 text-stone-500 text-[11px]">
              Currency: Malaysian Ringgit (MYR / RM)
              <br />
              Timezone: GMT+8 (Malaysia Standard Time)
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} WanderAI. Built for travelers worldwide.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>for Penang & Southeast Asia exploration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
